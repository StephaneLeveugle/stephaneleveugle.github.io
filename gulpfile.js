var gulp = require('gulp');
var $    = require('gulp-load-plugins')();

var sassPaths = [
  './node_modules/foundation-sites/scss',
  './node_modules/foundation-sites/assets',
  './node_modules/chartist/dist/scss'
];

gulp.task('sass', function() {
  return gulp.src('scss/*.scss')
    .pipe($.sass({
      includePaths: sassPaths
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest('./css'));
});

gulp.task('default', ['sass'], function() {
  gulp.watch(['scss/**/*.scss'], ['sass']);
});