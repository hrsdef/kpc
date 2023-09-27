const {resolve, root, destData} = require('../utils');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
// const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = (config) => {
    config
        .mode('development')
        // .mode('production')
        .resolve
            // .modules
                // .add(root)
                // .add('node_modules')
                // .end()
            .alias
                // .set('vue$', 'vue/dist/vue.js')
                .set('intact$', resolve('node_modules/intact/dist/index.esm.js'))
                .set('kpc$', resolve('index.ts'))
                .set('kpc', root)
                .set('@king-design/vue-legacy', resolve('packages/kpc-vue'))
                .set('@king-design/vue', resolve('packages/kpc-vue-next'))
                .set('@king-design/react', resolve('packages/kpc-react'))
                .set('@', root)
                .set('dayjs', 'dayjs/esm')
                .set('~', destData)
                .end()
            .symlinks(false)
            .extensions
                .add('.ts')
                .add('.js')
                .end()
            .end()
        // .optimization
            // .minimize(true)
            // .minimizer('uglify')
                // .use(TerserPlugin, [{
                    // test: /\.min\.js/,
                    // extractComments: false,
                    // terserOptions: {
                        // output: {
                            // comments: /^\**![\r\n]/,
                        // },
                    // }
                // }])
                // .end()
            // .splitChunks({
                // chunks: 'initial',
                // cacheGroups: {
                    // default: false,
                    // defaultVendors: false,
                // }
            // })
            // .runtimeChunk(false)
            // .end()
        .devtool('source-map')
        // .plugin('vue')
            // .use(VueLoaderPlugin)
            // .end()
        .target('web') // https://github.com/webpack/webpack-dev-server/issues/2758
        // .plugin('clean')
            // .use(CleanWebpackPlugin)
            // .end();
};
