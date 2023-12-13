const fs = require('fs-extra');
const yaml = require("js-yaml");
const marked = require('marked');
const highlight = require("highlight.js");
const {toVue2, toVue3} = require('./intact2vue');
const intact2react = require('./intact2react');
const intact2angular = require('./intact2angular');
const {root, writeFile, publicPath} = require('../utils');
const path = require('path');

const renderer = new marked.Renderer();
const codeRenderer = renderer.code;
const isProd = process.env.NODE_ENV === 'production';

if (isProd) {
    const image = renderer.image;
    renderer.image = (href, title, text) => {
        href = publicPath.slice(0, -1) + href;
        return image.call(renderer, href, title, text);
    }
}

renderer.table = (header, body) => {
    return `<div class="k-table k-grid">
        <div class="k-table-wrapper">
            <table>
                <thead>${header}</thead>
                <tbody>${body}</tbody>
            </table>
        </div>
    </div>`
};

renderer.paragraph = function(text) {
    return '<p>' + text.replace(/\n/g, '') + '</p>\n';
};

function handleFiles(files, dest) {
    if (!files.length) return;

    return Promise.all(files.map(async file => {
        const {contents, metadata} = parseYaml(await fs.readFile(file, 'utf-8'));

        if (!metadata) return;

        const isDemo = /demos/.test(file);
        const relativePath = path.relative(root, file);
        let basename = path.basename(relativePath, '.md');
        if (basename === 'index') {
            basename = path.dirname(basename);
        }
        const relative = path.join(path.dirname(relativePath), basename);
        const dir = path.join(dest, relative);
        const fileObj = {
            isDemo,
            path: dir,
            file,
            relative,
            id: relative.replace(/[\/\\]/g, '-'),
        };
        const {html, codes, catalogs} = parseMarkdown(fileObj, contents);

        try {
            await generateFiles(fileObj, codes, html, metadata, catalogs);
        } catch (e) {
            console.error(file);
            console.error(e);
        }

        return {metadata, file: fileObj, catalogs};
    }));
}

function parseYaml(contents) {
    let metadata;
    contents = contents.replace(/---\s*[\n\r]+\s*((?:.|\n|\r)*?)[\n\r]+---/, (all, matched) => {
        metadata = yaml.load(matched);
        return "";
    });

    return {contents, metadata};
}

function parseMarkdown(file, contents) {
    const codes = getAllCodes(file);
    const catalogs = getAllCatalogs(file);

    const html = marked(contents, {
        renderer,
        langPrefix: 'hljs ',
        highlight(code) {
            return highlight.highlightAuto(code).value;
        }
    });

    return {html, codes, catalogs};
}

function getAllCodes(file) {
    // get all codes
    const codes = [];
    const exampleReg = /^(example-?)/;
    renderer.code = function(code, language) {
        if (language === 'angular') return '';
        // for rendering example to html
        if (exampleReg.test(language)) {
            language = language.replace(exampleReg, "") || 'js';
            codes.push({
                language,
                content: code,
                example: true,
            });
            return `<!-- example -->`;
        }

        let matches;
        let ignore = false;
        let filename;

        if (matches = code.match(/@code/)) {
            ignore = true;
        } else if (matches = code.match(/@file ([^\s]+)/)) {
            filename = matches[1];
        }
        if (matches) {
            code = code.substring(code.indexOf('\n') + 1);
        }

        if (file.isDemo && !ignore) {
            codes.push({
                language,
                content: code,
                filename,
            });
            return '';
        }

        return codeRenderer.call(this, code, language);
    };

    return codes;
}

function getAllCatalogs(file) {
    let catalogs = [];
    let stack = [''];
    let prevLevel = 0;
    renderer.heading = function(text, level, raw) {
        const id = encodeURIComponent(raw);
        let parentId;
        if (level === prevLevel + 1) {
            parentId = stack[prevLevel];
            stack.push(`${parentId}${id}`);
            prevLevel++;
        } else {
            if (level < prevLevel) {
                stack.pop();
                prevLevel--;
            }
            parentId = stack[prevLevel - 1];
            stack[prevLevel] = `${parentId}${id}`;
        }
        const actualId = `${parentId}${id}`;
        let result = `<h${level} id='${actualId}'>${text}</h${level}>`;
        if (!file.isDemo && level < 4) {
            catalogs.push({
                text: text,
                level: level,
                id: actualId,
            });
        }
        return result;
    };

    return catalogs;
}

function generateFiles(file, codes, html, metadata, catalogs) {
    codes = parseCodes(file, codes);

    // only demo has codes
    const promises = codes.map((code, index) => {
        if (code.ignored) return;

        if (!code.example) {
            return generateDemoFiles(file, code);
        } else {
            return generateExampleFiles(file, code, index);
        }
    });

    promises.push(writeJson(file, codes, html, metadata, catalogs));

    if (!file.isDemo) {
        promises.push(writeIndex(file, metadata));
    }

    if (metadata.iframe) {
        promises.push(writeIframe(file, metadata.iframe));
    }

    return Promise.all(promises);
}

function generateDemoFiles(file, code) {
    const filename = getFileName(file, code);
    let {content, language, filename: _filename} = code;

    if (language === 'ts' && !_filename) {
        content = [
            `export {default as data} from './index.json';`,
            content,
        ].join('\n');
    } else if (language === 'styl' && !_filename) {
        const requires = [];
        content = [
            `.example.${file.id}`,
            ...content.split('\n').map(line => {
                if (line.startsWith('@require')) {
                    requires.push(line);
                    return '';
                }
                return `    ${line}`
            })
        ].join('\n');
        if (requires.length) {
            content = requires.join('\n') + '\n' + content;
        }
    }

    return writeFile(filename, content);
}

function generateExampleFiles(file, code, index) {
    return writeFile(path.join(file.path, `demos/demos${index}/index.ts`), code.content);
}

function writeJson(file, codes, html, metadata, catalogs) {
    const data = {
        setting: metadata,
        contents: html,
        index: file.id,
    };

    if (file.isDemo) {
        data.highlighted = codes.map(item => {
            return {
                language: item.language,
                content: `<pre><code class="hljs ${languageMap(item.language)}">` +
                    highlight.highlight(item.content, {language: languageMap(item.language)}).value +
                `</code></pre>`,
                file: item.filename,
            };
        });
    } else {
        data.catalogs = catalogs;
    }

    return writeFile(path.join(file.path, 'index.json'), JSON.stringify(data, null, 4));
}

function writeIndex(file, metadata) {
    const sidebar = metadata.sidebar;
    const content = [
        `import {Component} from 'intact';`,
        `import Article from '~/../src/components/article';`,
        `import data from './index.json';`,
        sidebar ? `import sidebar from '~/${sidebar}.json';` : undefined,
        ``,
        `const r = require.context('./', true, /demos.*(index|demo).ts/);`,
        `const keys = r.keys();`,
        `const demos: Component<any>[] = [];`,
        `for (let i = 0; i < keys.length; i++) {`,
        `    const file = keys[i];`,
        `    if (!file.startsWith('.')) continue;`,
        `    // if we found demo.js then ignore index.js`,
        `    if (/demo\.ts$/.test(file)) i++;`,
        `    demos.push(r(file));`,
        `}`,
        ``,
        `export default class extends Article {`,
        sidebar ? `    static sidebar = sidebar;` : undefined,
        `    static data = data;`,
        `    static defaults = () => ({`,
        `        ...Article.defaults, ...data, demos`,
        `    });`,
        `}`,
    ].join('\n');

    return writeFile(path.join(file.path, 'index.ts'), content);
}

function writeIframe(file, height) {
    return Promise.all([
        writeFile(path.join(file.path, 'demo.ts'), [
            `export {default as data} from './index.json';`,
            `import {Component} from 'intact';`,
            ``,
            `export default class extends Component {`,
            `    static template = \`<div class="browser-mockup">`,
            `        <iframe height="${height}" src="/demo/${file.relative}/"></iframe>`,
            `    </div>\`;`,
            `}`,
        ].join('\n')),
        // writeFile(path.join(file.path, 'iframe.js'), [
            // `import Intact from 'intact';`,
            // `import Demo from './index.js';`,
            // `Intact.mount(Demo, document.getElementById('page'));`,
        // ].join('\n')),
        // TODO: write index.html
    ]);
}

function getFileName(file, code) {
    let filename = code.filename;
    if (!filename) {
        switch (code.language) {
            case 'angular':
                filename = 'angular.ts';
                break;
            case 'react':
            case 'tsx':
                filename = 'react.tsx';
                break;
            case 'vue3':
                filename = 'next.vue';
                break;
            default:
                filename = `index.${code.language}`;
                break;
        }
    }
    return path.join(file.path, filename);
}

function parseCodes(file, codes) {
    const hasMap = {
        hasTs: false,
        hasStylus: false,
        hasVue: false,
        hasVue3: false,
        hasReact: false,
        hasAngular: false,
    };
    const hasLangMap = {
        styl: 'hasStylus',
        vue: 'hasVue',
        vue3: 'hasVue3',
        tsx: 'hasReact',
        angular: 'hasAngular',
    };

    const codeSnippetMap = {
        vueScript: null,
        vueTemplate: null,
        vueNextTemplate: null,
        vueData: null,
        vueMethods: null,
        reactMethods: null,
        angularMethods: null,
        tsHead: null,
        angularProperties: null
    };
    const codeSnippetLangMap = {};
    const codeSnippetLangArray = Object.keys(codeSnippetMap).map(key => {
        const lang = key.replace(/([A-Z])/g, c => `-${c.toLowerCase()}`);
        codeSnippetLangMap[lang] = key;
        return lang;
    });

    const ignoreMap = {
        'vue-ignore': 'vue',
        'react-ignore': 'jsx',
        'angular-ignore': 'ts',
    };

    let tsCode;

    codes = codes.filter((code, index) => {
        const {language, filename, content, example} = code;

        if (example) {
            code.content = [
                content,
                `export const example = true;`,
            ].join('\n');
            return true;
        }

        if (language === 'ts' && !filename) {
            hasMap.hasTs = true;
            tsCode = code;
            code.content = [
                `import {Component} from 'intact';`,
                `import template from './index.vdt';`,
                hasMap.hasStylus ? `import './index.styl'; \n` : '',
                content,
            ].join('\n');
            return true;
        }

        if (~Object.keys(hasLangMap).indexOf(language)) {
            hasMap[hasLangMap[language]] = true;
            return true;
        }

        if (~codeSnippetLangArray.indexOf(language)) {
            codeSnippetMap[codeSnippetLangMap[language]] = content;
            return false;
        }

        if (ignoreMap[language]) {
            code.language = ignoreMap[language];
            code.ignored = true;
            hasMap['has' + language.split('-')[0].replace(/[a-z]/, c => c.toUpperCase())] = true;

            return true;
        }

        return true;
    });

    if (file.isDemo) {
        if (!hasMap.hasTs) {
            codes.splice(hasMap.hasStylus ? 2 : 1, 0, (tsCode = {
                language: 'ts',
                content: [
                    `import {Component} from 'intact';`,
                    `import template from './index.vdt';`,
                    hasMap.hasStylus ? `import './index.styl'; \n` : '',
                    `export default class extends Component {`,
                    `    static template = template;`,
                    `}`,
                ].join('\n')
            }));
        }

        // ignore App component
        if (!/\/app\//.test(file.path)) {
            const ts = hasMap.hasTs ? tsCode.content.split('\n').slice(hasMap.hasStylus ? 3 : 2).join('\n') : null;
            const vdt = codes[0].content;
            generateOtherCodes(vdt, ts, hasMap, codeSnippetMap, codes);
        }
    }

    return codes;
}

function generateOtherCodes(vdt, ts, hasMap, codeSnippetMap, codes) {
    const {
        vueScript, vueTemplate, vueNextTemplate, vueMethods, vueData,
        tsHead, reactMethods, angularMethods, angularProperties
    } = codeSnippetMap;
    const {hasStylus, hasVue, hasVue3, hasReact, hasAngular} = hasMap;

    if (!hasVue) {
        const code3 = {
            language: 'vue',
            content: toVue3(vdt, ts, vueScript, vueTemplate, vueMethods, vueData, tsHead, hasStylus),
            filename: 'next.vue',
        };
        const code2 = {
            language: 'vue',
            content: toVue2(vdt, ts, vueScript, vueTemplate, vueMethods, vueData, tsHead, hasStylus)
        };
        if (!hasReact) {
            codes.push(code3, code2);
        } else {
            codes.splice(codes.length - 1, 0, code3, code2);
        }
    }

    if (!hasReact) {
        codes.push({
            language: 'tsx',
            content: intact2react(vdt, ts, reactMethods, tsHead, hasStylus),
            filename: 'react.tsx',
        });
    }

    if (!hasAngular) {
        // codes.push({
            // language: 'angular',
            // content: intact2angular(vdt, ts, angularMethods, angularProperties, hasStylus),
            // filename: 'angular.ts',
        // });
    }
}

const map = {
    'vue': 'html',
    'vdt': 'jsx',
    'angular': 'ts',
    'vue3': 'jsx',
};
function languageMap(key) {
    return map[key] || key;
};


process.on('message', ({files, dest}) => {
    handleFiles(files, dest).then(res => {
        process.send(res);
    });
});

module.exports = handleFiles;
