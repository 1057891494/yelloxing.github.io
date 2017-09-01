var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        bundle: path.join(__dirname, 'index.js')
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: '[name].js'
    },
    module: {
        loaders: [
            /*
            ----------------------------------------------------------------
            --- 说明:对不同的文件，配置对应的加载器，对应加载器的配置在独立的文件中 ---
            ----------------------------------------------------------------
             */
            {
                /*对jsx文件进行ES6->ES5的处理*/
                test: /\.js?$/,
                loader: 'babel-loader'
            }
        ]
    }
}