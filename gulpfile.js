"use strict";

var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var ngannotate = require('gulp-ng-annotate');

gulp.task('javascript', function() {
    var bundler = browserify({
        entries: [ './public/scripts/app/app.js' ],
        debug: true
    });

    var bundle = function() {
        return bundler
            .bundle()
            .pipe(source('bundle.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({loadMaps: true}))
            // Add transformation tasks to the pipeline here.
            .pipe(ngannotate())
            .pipe(uglify())
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('./public/scripts/'));
    };

    return bundle();
});

gulp.task('watch', function() {
    gulp.watch('./public/scripts/app/**/*.js', [ 'javascript' ]);
});

gulp.task('default', [ 'watch' ]);