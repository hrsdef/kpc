module.exports = function(api) {
    api.cache(true);

    const corejs = {version: 3, proposals: true};

    const config = {
        "presets": [
            ["@babel/preset-env", {
                "loose": true,
                "modules": 'cjs',
            }],
            "@babel/preset-typescript",
            "@vue/babel-preset-jsx",
        ],
        "plugins": [
            ["@babel/plugin-transform-runtime", {
                "corejs": corejs,
            }],
            ["@babel/plugin-proposal-decorators", {"legacy": true}],
            "@babel/plugin-proposal-do-expressions",
            ['@emotion', {
                sourceMap: false,
                autoLabel: 'never',
            }],
        ]
    };

    return config;
}
