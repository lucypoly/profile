var gulp = require('gulp'),
    less = require('gulp-less'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename'),
    handlebars = require('gulp-compile-handlebars'),
    livereload = require('gulp-livereload'),
    concat = require('gulp-concat');

gulp.task('scripts', function () {
    return gulp.src('assets/js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('assets/dist/'));
});


gulp.task('express', function () {
    var express = require('express');
    var app = express();
    app.use(express.static('index.html'));
    app.listen(4000);
});


gulp.task('watch', function () {
    livereload.listen();
    gulp.watch('assets/less/*.less', ['less']);
    gulp.watch('assets/js/*.js', ['scripts']);
    gulp.watch(['assets/partials/*.hbs'], ['handlebars']);
    gulp.watch(['index.hbs'], ['handlebars']);
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
        .pipe(gulp.dest('assets/dist/css'))
        .pipe(livereload());
});

gulp.task('handlebars', function () {
    options = {
        ignorePartials: true, //ignores the unknown footer2 partial in the handlebars template, defaults to false
        batch: ['partials'] // Javascript array of filepaths to use as partials
    };
    return gulp.src('index.hbs')
        .pipe(handlebars(options))
        .pipe(rename(function (path) {
            path.extname = '.html';
        }))
        .pipe(gulp.dest(''))
        .pipe(livereload())
});


gulp.task('run', ['scripts', 'less', 'watch', 'express']);