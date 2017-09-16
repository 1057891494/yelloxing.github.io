'use strict';

let exec = require('child_process').exec;
let appendFile = require('fs').appendFile;

let shelljs = require('shelljs');

console.log("[" + new Date() + "] >>> 开始启动编译......");

console.log("[" + new Date() + "] >>> 开始执行[npm run scss_compiler]");

exec("npm run scss_compiler", function(err, stdout, stderr) {
    if (err) {
        console.log(stderr);
        console.log(err);
        console.log(stdout);
        console.log("[" + new Date() + "] >>> 出错的命令【npm run scss_compiler】");
    } else {
        console.log(stdout);
        console.log("[" + new Date() + "] >>> 开始执行[npm run grunt_css_compiler]");
        exec("npm run grunt_css_compiler", function(err, stdout, stderr) {
            if (err) {
                console.log(stderr);
                console.log(err);
                console.log(stdout);
                console.log("[" + new Date() + "] >>> 出错的命令【npm run grunt_css_compiler】");
            } else {
                console.log(stdout);
                console.log("[" + new Date() + "] >>> 开始执行[npm run webpack_compiler]");
                exec("npm run webpack_compiler", function(err, stdout, stderr) {
                    if (err) {
                        console.log(stderr);
                        console.log(err);
                        console.log(stdout);
                        console.log("[" + new Date() + "] >>> 出错的命令【npm run webpack_compiler】");
                    } else {
                        console.log(stdout);
                        console.log("[" + new Date() + "] >>> 开始执行[npm run grunt_compress_compiler]");
                        exec("npm run grunt_compress_compiler", function(err, stdout, stderr) {
                            if (err) {
                                console.log(stderr);
                                console.log(err);
                                console.log(stdout);
                                console.log("[" + new Date() + "] >>> 出错的命令【npm run grunt_compress_compiler】");
                            } else {
                                console.log(stdout);
                                console.log("[" + new Date() + "] >>> 开始为打包后的未压缩css文件追加映射关系链接\n");
                                let link_map = '/*# sourceMappingURL=../OOSCSS/ooscss.standard.css.map */';
                                appendFile('./build/bundle.css', link_map, 'utf8', function(error) {
                                    if (error) {
                                        console.log(error);
                                        console.log("[" + new Date() + "] >>> 【为打包后的未压缩css文件追加映射关系链接】失败");
                                    } else {
                                        console.log("[" + new Date() + "] >>> 【为打包后的未压缩css文件追加映射关系链接】成功\n");
                                        console.log(stdout);
                                        console.log("[" + new Date() + "] >>> 开始执行[npm run grunt_lazy_compiler]");
                                        exec("npm run grunt_lazy_compiler", function(err, stdout, stderr) {
                                            if (err) {
                                                console.log(stderr);
                                                console.log(err);
                                                console.log(stdout);
                                                console.log("[" + new Date() + "] >>> 出错的命令【npm run grunt_lazy_compiler】");
                                            } else {
                                                console.log(stdout);
                                                console.log("[" + new Date() + "] >>> |-------------------------------------------------------------------|\n");
                                                console.log("[" + new Date() + "] >>>    编译时间：" + new Date());
                                                console.log("[" + new Date() + "] >>>    脚本作者：心叶");
                                                console.log("[" + new Date() + "] >>>    E-mail：yelloxing@gmail.com");
                                                console.log("[" + new Date() + "] >>>    主页：https://yelloxing.github.io/");
                                                console.log("[" + new Date() + "] >>>    寄语：走一步，再走一步。\n");
                                                console.log("[" + new Date() + "] >>> |-------------------------------------------------------------------|\n");
                                                console.log("[" + new Date() + "] >>> 编译结束");
                                                console.log("[" + new Date() + "] >>> 开始启动监听");
                                                shelljs.exec("npm run listen");
                                                console.log("[" + new Date() + "] >>> 开始监听");
                                            }
                                        });

                                    }
                                });
                            }
                        });
                    }
                });

            }
        });
    }

});
