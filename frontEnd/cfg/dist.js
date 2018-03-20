const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {dfPath, dfConfig } = require('./default.js');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require("autoprefixer");

console.log(process.env.NODE_ENV);

const extractCSS = new ExtractTextPlugin({
    filename: 'css/[id]-[contenthash:8].css',
    allChunks: true
});
const extractGloSCSS = new ExtractTextPlugin({
    filename: 'css/[id]-[contenthash:8].css',
    allChunks: true
});
const extractLocSCSS = new ExtractTextPlugin({
    filename: 'css/[id]-[contenthash:8].css',
    allChunks: true
});

let config = Object.assign({}, dfConfig, {

    entry: {
        app: './src/app.js',
        common: ['react', 'react-dom',  'redux', 'redux-thunk', 'react-redux', 'react-router-redux', 'react-router']
    },

    plugins: [ ...dfConfig.plugins,
        new HtmlWebpackPlugin({
            filename: '../index.html',
            template: './src/index.html'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            minChunks: Infinity
        }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'play',
        //     minChunks: 1
        // })

        new ChunkManifestPlugin({
            filename: 'manifest.json',
            manifestVariable: 'webpackManifest',
            inlineManifest: false
        }),
        extractCSS,
        extractGloSCSS,
        extractLocSCSS
    ],

    resolve: {
        modules: [
            'node_modules',
            dfPath.src,
            dfPath.common,
            dfPath.components,
            dfPath.view,
            dfPath.root
        ]
    },
    // devtool: 'source-map'
    devtool: 'false'

});


config.module.rules.push(
    {
        test: /\.js$/,
        use: ['babel-loader'],
        include:[
            dfPath.src
        ]
    },
    {
        test: /\.css$/,
        use: extractCSS.extract({
            use: [{
                loader: 'css-loader',
                options: {
                    minimize: true
                }
            },
                {
                  loader: "postcss-loader",
                  options: {
                      ident: "postcss",
                      plugins: [
                          require("autoprefixer")({browsers: "last 5 versions"})
                      ]
                  }
                },
            ]
        })
    },
    {
        test: /\.scss$/,
        use: extractGloSCSS.extract({
            use: [
                {
                    loader: 'css-loader',
                    options: {
                        module: false,
                        localIdentName: '[local]--[hash:base64:6]',
                        minimize: true
                    }
                },
                {
                    loader: 'sass-loader'
                }
            ]
        }),
        include: [dfPath.common, 'node_modules']
    },
    {
        test: /\.scss$/,
        use: extractLocSCSS.extract({
            use: [
                {
                    loader: 'css-loader',
                    options: {
                        module: true,
                        localIdentName: '[local]--[hash:base64:6]',
                        minimize: true
                    }
                },
                {
                    loader: 'sass-loader'
                }
            ]
        }),
        include: [dfPath.src],
        exclude: [dfPath.common],

    }
);

module.exports = config;
