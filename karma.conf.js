//测试karma-jasmine

module.exports = function(config) {
    config.set({

        // 根路径，后面配置的基本所有相对路径都会根据这个路径来构造。
        basePath: '.',

        // 使用到的框架
        // 目前支持的框架： https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],

        // 将会在浏览器里面执行的代码
        files: [
            'test/*.js',
            'lazy/*.js'
        ],

        // 需要从 files 中排除掉的文件
        exclude: ["karma.conf.js"],

        // 需要做预处理的文件，以及这些文件对应的预处理器。
        // 此处就可以将 coffee 、 ES6 等代码转换一下。
        // preprocessors: {
        //     'test/*.js': ['webpack'],
        //     'src/*.js': ['webpack']
        // },

        // 配置webpack如何处理js文件
        // webpack: {
        //     module: {
        //         loaders: [
        //             { test: /\.js/, exclude: /node_modules/, loader: 'babel-loader' }
        //         ]
        //     },
        //     watch: true
        // },

        // 实际使用的报告期
        // 可用的报告器： https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],

        // 服务器端口号
        port: 4000,

        // 在输出内容（报告器和日志）中启用/禁用颜色
        colors: true,

        // 日志级别
        // 取值： config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // 启用/禁用监视文件变化重新执行测试的功能
        autoWatch: true,

        // 要测试的目标环境
        browsers: ['Chrome'],

        //设置为 false 的话，karma 会自动监控测试环境，默认是 Chrome, 如果你关掉了，karma 会自动重新启动一个。如果配置为 true，执行一次测试之后，karma 会自动停掉。
        singleRun: false,
        concurrency: Infinity
    })
}
