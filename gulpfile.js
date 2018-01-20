var gulp = require('gulp'),
    connect = require('gulp-connect'),
    livereload = require('gulp-livereload');

gulp.task('webserver', function() {
    connect.server({
        livereload: true,
        port: 20000
    });
});
gulp.task('watch', function() {
    livereload.listen(); //这里需要注意！旧版使用var server = livereload();已经失效
    gulp.watch(['page/**/*.*', 'index.html','script.js','style.css'], function(event) {
        livereload.changed(event.path);
    });
});

gulp.task('default', ['webserver', 'watch']);
