const gulp = require('gulp');
const stylus = require('gulp-stylus');
const browserSync = require('browser-sync').create();
const rename = require('gulp-rename');

const isDevelopment = process.env.NODE_ENV !== 'production';


gulp.task('styles', function () {
  return gulp.src('./src/app.styl')
    .pipe(stylus({
      'include css': true
    })
    .pipe(rename('style.css'))
    .pipe(gulp.dest('./public/css'))
});

gulp.task('watch', function () {
  gulp.watch('./src/**/*.{css,styl}', gulp.series('styles'));
});

gulp.task('serve', function () {
  browserSync.init({
    server: './public',
    port: 8080
  });

  browserSync.watch('./public/**/*.*').on('change', browserSync.reload);
});

gulp.task('build', gulp.series(
  gulp.parallel(
    'styles',
  )));

gulp.task('default', gulp.series(
  'build',
  gulp.parallel(
    'watch',
    'serve'
  )));
