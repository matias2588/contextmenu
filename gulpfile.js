"use strict";

var del = require('del');
var exec = require('child_process').exec;
var fs = require('fs');
var gulp = require('gulp');
var os = require('os');
var sass = require('gulp-sass');
var tslint = require('gulp-tslint');

gulp.task('default', ['build']);

// Build.

gulp.task('build', ['transpile:ts'], function() {
    return del([
        './aot'
    ]);
});

gulp.task('watch', function() {
    gulp.watch(['./src/**/*'], ['build']);
});

gulp.task('clean', function() {
    return del(['./aot', './dist/**/*']);
});

// Typescript --> Javascript.
/*gulp.task('lint:ts', function() {
    var stream = gulp.src(['./src/*.ts'])
        .pipe(tslint({
            formatter: "verbose"
        }))
        .pipe(tslint.report())
    return stream;
});*/

gulp.task('transpile:ts', ['clean'], function (cb) {

    var cmd = os.platform() === 'win32' ?
        'node_modules\\.bin\\ngc -p src/tsconfig.json' : 
        './node_modules/.bin/ngc -p src/tsconfig.json';

    exec(cmd, function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

