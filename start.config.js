'use strict';

let exec = require('child_process').exec;
let appendFile = require('fs').appendFile;

console.log("开始启动编译......");

console.log("开始执行[npm run scss_compiler]");

exec("npm run scss_compiler", function(err, stdout, stderr) {
    if (err) {
        console.log(stderr);
        console.log(err);
        console.log(stdout);
        console.log("出错的命令【npm run scss_compiler】");
    } else {
        console.log(stdout);
        console.log("开始执行[npm run grunt_css_compiler]");
        exec("npm run grunt_css_compiler", function(err, stdout, stderr) {
            if (err) {
                console.log(stderr);
                console.log(err);
                console.log(stdout);
                console.log("出错的命令【npm run grunt_css_compiler】");
            } else {
                console.log(stdout);
                console.log("开始执行[npm run webpack_compiler]");
                exec("npm run webpack_compiler", function(err, stdout, stderr) {
                    if (err) {
                        console.log(stderr);
                        console.log(err);
                        console.log(stdout);
                        console.log("出错的命令【npm run webpack_compiler】");
                    } else {
                        console.log(stdout);
                        console.log("开始执行[npm run grunt_compress_compiler]");
                        exec("npm run grunt_compress_compiler", function(err, stdout, stderr) {
                            if (err) {
                                console.log(stderr);
                                console.log(err);
                                console.log(stdout);
                                console.log("出错的命令【npm run grunt_compress_compiler】");
                            } else {
                                console.log(stdout);
                                console.log("开始为打包后的未压缩css文件追加映射关系链接\n");
                                let link_map = '/*# sourceMappingURL=../OOSCSS/ooscss.standard.css.map */';
                                appendFile('./build/bundle.css', link_map, 'utf8', function(error) {
                                    if (error) {
                                        console.log(error);
                                        console.log('【为打包后的未压缩css文件追加映射关系链接】失败');
                                    } else {
                                        console.log('【为打包后的未压缩css文件追加映射关系链接】成功\n');
                                        console.log('|-------------------------------------------------------------------|\n');
                                        console.log('   编译时间：' + new Date());
                                        console.log('   脚本作者：心叶');
                                        console.log('   E-mail：yelloxing@gmail.com');
                                        console.log('   主页：https://yelloxing.github.io/');
                                        console.log('   寄语：走一步，再走一步。');
                                        console.log('\n|-------------------------------------------------------------------|\n');
                                        console.log("编译结束");
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
