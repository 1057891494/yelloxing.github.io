'use strict';
var hazy = require('./hazy.dev.js').hazy;
hazy.unshift('./hazy/begin.template');
hazy.push('./hazy/end.template');
var infomationHazy = "" +
    "/*!\n" +
    "* <%= pkg.name %> Sprout<%= pkg.version %> hazy\n" +
    "* https://yelloxing.github.io\n" +
    "* \n" +
    "* Copyright <%= pkg.author %> and other contributors\n" +
    "* \n" +
    "* Released under the <%= pkg.license %>\n" +
    "* \n" +
    "* <%= pkg.description %>\n" +
    "* \n" +
    "* Date: <%= grunt.template.today('yyyy-mm-dd') %>\n" +
    "*/\n";
module.exports = function(grunt) {

    /*配置插件*/
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: { //合并hazy代码
            options: {
                separator: '\n', //文件连接分隔符，表示连接的文件用指定的separator分割。
                stripBanners: true, //如果为true，去除代码中的块注释，默认为false
                banner: infomationHazy
            },
            target: {
                src: hazy,
                dest: 'build/hazy.js'
            }
        },
        jshint: {//hazy语法检查
            options: {
                '-W064': true,
                "strict": true,
                "eqnull": true,
                "undef": true,
                "globals": {
                    "$": true,
                    "window": true,
                    "angular": true,
                    "vx": true,
                    "document": true,
                    "jQuery": true,
                    "console": true
                },
                "force": true, // 强制执行，即使出现错误也会执行下面的任务
                "reporterOutput": 'jshint.debug.txt' //将jshint校验的结果输出到文件
            },
            afterconcat: "build/hazy.js" // 合并之后检测
        },
        uglify: { //压缩hazy代码
            options: {
                banner: infomationHazy
            },
            target: {
                options: {
                    mangle: true
                },
                files: [{
                    'build/hazy.min.js': ['build/hazy.js']
                }]
            }
        },
        postcss: { //后处理leaf代码
            options: {
                processors: [
                    require('autoprefixer')()
                ]
            },
            target: {
                src: './leaf/leaf.css',
                dest: 'build/leaf.css'
            }
        },
        cssmin: { //压缩leaf代码
            options: {
                keepSpecialComments: 0
            },
            target: {
                files: {
                    'build/leaf.min.css': ['build/leaf.css']
                }
            }
        }
    });

    /*加载插件*/
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    /*注册任务*/
    grunt.registerTask('default', ['concat:target', 'jshint:afterconcat', 'uglify:target', 'postcss:target', 'cssmin:target']);
};
