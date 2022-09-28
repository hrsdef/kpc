const path = require('path');
const os = require('os');
const webpackConfig = require('./webpack.config');

const isDebug = !process.env.UPDATE && !process.env.CI

// for get font files
// https://github.com/ryanclark/karma-webpack/issues/498#issuecomment-790040818
const output = {
    path: path.join(os.tmpdir(), '_karma_webpack_') + Math.floor(Math.random() * 1000000),
};

module.exports = function (config) {
    config.set({
        browsers: process.env.UPDATE || process.env.CI ? ['MyChromeHeadless'] : undefined,
        customLaunchers: {
            'MyChromeHeadless': {
                base: 'ChromeHeadless',
                flags: [
                    '--window-size=1920,1080',
                    '--force-device-scale-factor=1',
                    '--disable-gpu',
                    '--no-sandbox',
                ],
            }
        },
        frameworks: ['webpack', 'mocha', 'sinon-chai', 'snapshot', 'mocha-snapshot'],
        reporters: ['mocha'],
        files: [
            './index.ts',
            '__snapshots__/**/*.md',
        ],
        preprocessors: {
            './index.ts': ['webpack', 'sourcemap'],
            '__snapshots__/**/*.md': ['snapshot'],
        },
        webpack: {...webpackConfig().toConfig(), output},
        webpackMiddleware: {
            // noInfo: true
        },
        // autoWatch: true,
        mochaReporter: {
            showDiff: true,
        },
        client: {
            mocha: {
                reporter: 'html',
                ui: 'bdd',
            }
        },
        snapshot: {
            update: process.env.UPDATE === '1',
        },
        logLevel: config.LOG_INFO,
        singleRun: !isDebug,
    });
};
