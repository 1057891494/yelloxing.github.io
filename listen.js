var chokidar = require('chokidar');

var shelljs = require('shelljs');

var appendFile = require('fs').appendFile;

var fs = require('fs');

var map = '/*# sourceMappingURL=../OOSCSS/ooscss.standard.css.map */';

chokidar.watch('OOSCSS/src').on('change', function() {

    'use strict';
    console.log("[" + new Date() + "] >>> 监听到样式文件改变\n");
    shelljs.exec("npm run scss_compiler");
    console.log("[" + new Date() + "] >>> scss编译结束\n");

});

chokidar.watch('OOSCSS/ooscss.standard.css').on('change', function() {

    'use strict';
    console.log("[" + new Date() + "] >>> 监听到样式编译结束，开始css的后处理\n");
    shelljs.exec("npm run grunt_css_compiler");
    console.log("[" + new Date() + "] >>> css后处理结束,开始追加map映射\n");
    appendFile('./build/bundle.css', map, 'utf8', function(error) {
        if (error) {
            console.log(error);
            console.log("[" + new Date() + "] >>> 【为打包后的未压缩css文件追加映射关系链接】失败");
        } else {
            console.log("[" + new Date() + "] >>> 监听到css追加map映射结束，开始css的压缩\n");
            shelljs.exec("npm run grunt_compress_compiler");
            console.log("[" + new Date() + "] >>> css压缩结束\n");
        }
    });

});

chokidar.watch('component').on('change', function() {
    console.log("[" + new Date() + "] >>> 监听到组件修改\n");
    shelljs.exec("npm run webpack_compiler");
    console.log("[" + new Date() + "] >>> 组件编译结束\n");
});

chokidar.watch('sprout.router.js').on('change', function() {
    console.log("[" + new Date() + "] >>> 监听到路由修改\n");
    shelljs.exec("npm run webpack_compiler");
    console.log("[" + new Date() + "] >>> 路由编译结束\n");
});

chokidar.watch('index.js').on('change', function() {
    console.log("[" + new Date() + "] >>> 监听到启动脚步修改\n");
    shelljs.exec("npm run webpack_compiler");
    console.log("[" + new Date() + "] >>> 启动脚步编译结束\n");
});
