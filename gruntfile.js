module.exports = function(grunt) {

    /*配置插件*/
    grunt.initConfig({
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
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    /*注册任务*/
    grunt.registerTask('stylepost', ['postcss:target']);
    grunt.registerTask('filecompress', ['uglify:target', 'cssmin:target']);
};