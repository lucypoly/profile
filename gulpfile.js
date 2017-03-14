var gulp = require('gulp'),
    less = require('gulp-less'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename'),
    livereload = require('gulp-livereload');


gulp.task('watch', function () {
    livereload.listen();
    gulp.watch('assets/less/*.less', ['less']);
});

gulp.task('less', function () {

    return gulp.src('assets/less/styles.less')
        .pipe(less().on('error', function (err) {
            console.log(err);
        }))
        .pipe(cssmin().on('error', function (err) {
            console.log(err);
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('assets/css'))
        .pipe(livereload());


});

gulp.task('default', ['less', 'watch']);