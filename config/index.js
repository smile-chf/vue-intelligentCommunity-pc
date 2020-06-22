'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
    dev: {

        // Paths
        assetsSubDirectory: 'static',
        assetsPublicPath: '/intelligentCommunityManageView/',
        proxyTable: {
            // "/intelligentCommunity": {
            //     target: "http://192.168.1.210:8890",
            //     // target: "http://192.168.1.110:8890",
            //     // target: "http://192.168.1.180:8888",
            //     changeOrigin: true,
            //     // pathRewrite: {
            //     //     "^/intelligentCommunity": "/intelligentCommunity"
            //     // }
            // },
            "/intelligentCommunity": {
                /* 目标代理服务器地址 */
                target: "http://www.ahshequ.cn",
                changeOrigin: true,
                // pathRewrite: {
                //     "^/intelligentCommunity": "/intelligentCommunity"
                // }
            },
            '/hfcx_multi_project': {
                target: 'https://www.0551cx.com',
                changeOrigin: true,
                pathRewrite: { "^/hfcx_multi_project": "/hfcx_multi_project" }
            }
        },

        // Various Dev Server settings
        // host: 'localhost',
        host: '192.168.1.245',
        port: 8082,
        // host: 'www.ahshequ.cn',
        // port: 80,
        autoOpenBrowser: true,
        errorOverlay: true,
        notifyOnErrors: true,
        poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-


        /**
         * Source Maps
         */

        // https://webpack.js.org/configuration/devtool/#development
        devtool: 'cheap-module-eval-source-map',

        // If you have problems debugging vue-files in devtools,
        // set this to false - it *may* help
        // https://vue-loader.vuejs.org/en/options.html#cachebusting
        cacheBusting: true,

        cssSourceMap: true
    },

    build: {
        // Template for index.html
        index: path.resolve(__dirname, '../dist/index.html'),

        // Paths
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/intelligentCommunityManageView/',

        /**
         * Source Maps
         */

        productionSourceMap: false,
        // https://webpack.js.org/configuration/devtool/#production
        devtool: '#source-map',

        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],

        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    }
}
