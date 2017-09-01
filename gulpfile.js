var gulp = require('gulp');
var connect = require('gulp-connect');

gulp.task('webserver', function() {
    connect.server({
        livereload: false,
        port: 7070
    });
});

gulp.task('default', ['webserver']);