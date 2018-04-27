var chokidar = require('chokidar');

var shelljs = require('shelljs');

chokidar.watch('script').on('change', function() {
    console.log("[" + new Date() + "] >>> 监听到控制脚步文件修改\n");
    shelljs.exec("npm run prod");
    console.log("[" + new Date() + "] >>> 脚步文件编译结束\n");
});
console.log("[" + new Date() + "] >>> 启动对脚步文件修改监控成功\n");

chokidar.watch('style').on('change', function() {
    console.log("[" + new Date() + "] >>> 监听到控制样式文件修改\n");
    shelljs.exec("npm run prod");
    console.log("[" + new Date() + "] >>> 样式文件编译结束\n");
});
console.log("[" + new Date() + "] >>> 启动对样式文件修改监控成功\n");
