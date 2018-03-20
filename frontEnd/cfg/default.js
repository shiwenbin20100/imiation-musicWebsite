const path = require('path');
const webpack = require('webpack');

let dfPath = {
    src: path.resolve(__dirname, '../src'),
    dist: path.resolve(__dirname, '../dist'),
    common: path.resolve(__dirname, '../src/common'),
    components: path.resolve(__dirname, '../src/components'),
    view: path.resolve(__dirname, '../src/view'),
    root: path.resolve(__dirname, '../'),
    reduxes: path.resolve(__dirname, '../src/reduxes')
}

let env = process.env.NODE_ENV;

env = env ? env : 'development';
// env = "production";

let dfConfig = {
    entry: [
        './src/app.js'
    ],
    output: {
        path: path.resolve(__dirname, '../dist/assets'),
        filename: env==="production"?'js/[name]_[hash:8].js':"main.js",
        // publicPath: '/public/assets/',
        publicPath: './assets/',
        // chunkFilename: "[name].js"
    },

    module: {
        rules: [
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: ['url-loader?limit=8192&name=img/[name].[ext]']
            },
            {
                test: /\.(mp3|mp4|ogg|svg)$/,
                use: ['file-loader?name=audio/[name].[ext]']
            },
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                use: ['url-loader?limit=10000&mimetype=application/font-woff']
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                use: ['url-loader?limit=10000&mimetype=application/octet-stream']
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                use: ['file-loader']
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: ['url-loader?limit=10000&mimetype=image/svg+xml']
            },
            {
                test: /\.txt$/,
                use: ['raw-loader']
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            React: 'react',
            ReactDOM: 'react-dom',
            Component: ['react', 'Component'],
            PT: 'prop-types',
            push: ['react-router-redux', 'push']
        })
        // new OpenBrowser({url: `http://localhost:${9000}`})
    ],
}

module.exports = {
    dfPath,
    dfConfig
};
