'use strict';
var src_list = ["lazy/core.js", "lazy/dom.js", "lazy/event.js", "lazy/selector.js"];
module.exports = function(grunt) {

    /*配置插件*/
    grunt.initConfig({
        concat: { //合并代码
            options: {
                separator: ';', //文件连接分隔符，表示连接的文件用指定的separator分割。
                stripBanners: false //如果为true，去除代码中的块注释，默认为false
            },
            target: {
                src: src_list,
                dest: 'build/core.js'
            }
        },
        postcss: {
            options: {
                processors: [
                    require('autoprefixer')()
                ]
            },
            target: {
                src: 'OOSCSS/ooscss.standard.css',
                dest: 'build/bundle.css'
            }
        },
        uglify: {
            options: {
                banner: ""
            },
            target: {
                options: {
                    mangle: true
                },
                files: [{
                    'build/bundle.min.js': ['build/bundle.js']
                }]
            },
            targetCore: {
                options: {
                    mangle: true
                },
                files: [{
                    'build/core.min.js': ['build/core.js']
                }]
            }
        },
        cssmin: {
            options: {
                keepSpecialComments: 0
            },
            target: {
                files: {
                    'build/bundle.min.css': ['build/bundle.css']
                }
            }
        }
    });

    /*加载插件*/
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    /*注册任务*/
    grunt.registerTask('stylepost', ['postcss:target']);
    grunt.registerTask('filecompress', ['uglify:target', 'cssmin:target']);
    grunt.registerTask('fileLazy', ['concat:target', 'uglify:targetCore']);
};
