const gulp = require('gulp');
const browser = require('gulp-browser');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');

const transforms = [
  {
    transform: 'babelify',
    options: {
      presets: ['env', 'minify'],
      global: true, // true for production
      sourceMaps: true
    }
  }
];

gulp.task('default', ['make-app']);

gulp.task('make-app', function() {
  return gulp.src('src/index.js')
    //.pipe(sourcemaps.init())
    .pipe(browser.browserify(transforms))
    .pipe(rename('app.js'))
    //.pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dest'));
});

gulp.task('move-html', function() {
  return gulp.src('src/index.html')
    .pipe(gulp.dest('dest'));
});
