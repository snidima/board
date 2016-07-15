'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');//https://www.npmjs.com/package/gulp-sass/
var browserSync = require('browser-sync').create();//https://www.browsersync.io/docs/gulp
var imagemin = require('gulp-imagemin');//https://www.npmjs.com/package/gulp-imagemin/
var clean = require('gulp-clean');//https://www.npmjs.com/package/gulp-clean
var jade = require('gulp-jade');//https://www.npmjs.com/package/gulp-jade/
var browserify = require('gulp-browserify');//https://www.npmjs.com/package/gulp-browserify
var rename = require('gulp-rename');//https://www.npmjs.com/package/gulp-rename/
var plumber = require('gulp-plumber');//https://www.npmjs.com/package/gulp-plumber
var reactify = require('reactify');
var uglify = require('gulp-uglify');//https://www.npmjs.com/package/gulp-uglify
var autoprefixer = require('gulp-autoprefixer');//https://www.npmjs.com/package/gulp-autoprefixer
var cleanCSS = require('gulp-clean-css');//https://github.com/scniro/gulp-clean-css
var htmlmin = require('gulp-htmlmin');//https://github.com/jonschlinkert/gulp-htmlmin

var paths = {
  sass:{
    src: './src/styles/**/main.sass',
    dist: './public/styles'
  },
  images:{
    src:'./src/images/**/*',
    dist:'./public/images'
  },
  scripts:{
    src:'src/scripts/main.js',
    dist:'./public/js'
  },
  templates:{
    src:'./src/templates/pages/**/*',
    dist:'./public'
  }
};

var production = {
    folder:'./production',
    css:   './production/styles',
    js:    './production/js',
    html:  './production'
};

///////////////////////PRODUCTION///////////////////////
gulp.task('production:clean', function () {
    return gulp.src(production.folder, {read: false})
        .pipe(clean());
});
gulp.task('html:prod', function() {
    return gulp.src(paths.templates.src)
        .pipe(plumber())
        .pipe(jade())
        .pipe(htmlmin({collapseWhitespace: true, removeComments: true}))
        .pipe(gulp.dest(production.html))
});
gulp.task('scripts:prod', function() {
    return gulp.src(paths.scripts.src)
        .pipe(plumber())
        .pipe(browserify({transform:'reactify'}))
        .pipe(rename('app.js'))
        .pipe(uglify({mangle: {toplevel: true}}))
        .pipe(gulp.dest(production.js));
});
gulp.task('css:prod', function () {
    return gulp.src(paths.sass.src)
        .pipe(plumber())
        .pipe(sass({
            indentedSyntax: true
        }).on('error', sass.logError))
        .pipe(autoprefixer({ browsers: ['> 1%', 'IE 7'], cascade: false }))
        .pipe(cleanCSS())
        .pipe(gulp.dest(production.css));
});
///////////////////////PRODUCTION///////////////////////









///////////////////////DEVELOP///////////////////////
gulp.task('images', ['clean:images'],function () {
  return gulp.src(paths.images.src)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.images.dist))
});
gulp.task('clean:images', function () {
    return gulp.src(paths.images.dist, {read: false})
        .pipe(clean());
});
gulp.task('sass', function () {
  return gulp.src(paths.sass.src)
    .pipe(plumber())
    .pipe(sass({
        indentedSyntax: true
      }).on('error', sass.logError))
    .pipe(gulp.dest(paths.sass.dist));
});
gulp.task('clean:styles', function () {
    return gulp.src(paths.sass.dist, {read: false})
        .pipe(clean());
});
gulp.task('scripts', function() {
    return gulp.src(paths.scripts.src)
        .pipe(plumber())
        .pipe(browserify({transform:'reactify'}))
        .pipe(rename('app.js'))
        .pipe(gulp.dest(paths.scripts.dist));
});
gulp.task('jade', function() {
  return gulp.src(paths.templates.src)
    .pipe(plumber())
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest(paths.templates.dist))
});
///////////////////////DEVELOP///////////////////////








///////////////////////MAIN///////////////////////
gulp.task('serve', ['sass','images','jade','scripts'], function() {
    browserSync.init({
        server: "./public",
        port: 8080
    });
    gulp.watch('./src/styles/**/*', ['sass']);
    gulp.watch('./src/templates/**/*', ['jade']);
    gulp.watch('./src/scripts/**/*', ['scripts']);
    gulp.watch("./public/**/*").on('change', browserSync.reload);
});
gulp.task('default', ['serve']);
gulp.task('production', ['production:clean','html:prod','scripts:prod','css:prod']);
///////////////////////MAIN///////////////////////