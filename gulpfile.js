const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const autoprefixer = require('autoprefixer');
// const uglify = require('gulp-uglify-es');
const terser = require('gulp-terser');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const concat = require('gulp-concat');
const lineec = require('gulp-line-ending-corrector');
const filespath = {
  scsspath: './assets/scss/**/*.scss',
  jspath: './assets/js/**/*.js'
};

let JSRC = [
  './assets/plugins/swiper/swiper.min.js',
  './assets/js/main.js'
];

function style() {
  return gulp
    .src(filespath.scsspath)
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(gulp.dest('./assets/css'))
    .pipe(browserSync.stream());
}
function javascript() {
  return gulp
    .src(JSRC)
    .pipe(concat('all.js'))
    .pipe(terser())
    .pipe(lineec())
    .pipe(gulp.dest('./assets/js/'));
}
function watch() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
  gulp.watch(filespath.scsspath, style);
  gulp.watch(JSRC, javascript);
  gulp.watch(filespath.jspath).on('change', browserSync.reload);
  gulp.watch('./*.html').on('change', browserSync.reload);
}

exports.watch = watch;
exports.style = style;
exports.javascript = javascript;
