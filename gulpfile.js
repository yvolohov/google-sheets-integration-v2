const gulp = require('gulp');
const browser = require('gulp-browser');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');

const transforms = [
  {
    transform: 'babelify',
    options: {
      presets: ['env', 'minify'],
      global: true // true for production
    }
  }
];

gulp.task('default', ['make-app']);

gulp.task('make-app', function() {
  return gulp.src('src/index.js')
    .pipe(browser.browserify(transforms))
    .pipe(rename('app.js'))
    .pipe(gulp.dest('dest'));
});
