const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    entry: [
        path.join(__dirname, 'script/root.js'),
        path.join(__dirname, 'style/root.scss')
    ],
    output: {
        path: path.join(__dirname, ''),
        filename: 'script.js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'css-loader',
                    use: ['postcss-loader', 'sass-loader']
                })
            }, {

                test: /\.(png)|(jpg)$/,
                loader: "url-loader"

            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("style.css"),
        // new UglifyJSPlugin(), //压缩js代码
        new OptimizeCssAssetsPlugin() //压缩css代码
    ]
}
