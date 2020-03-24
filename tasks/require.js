const gulp = require('gulp');

function requireJs() {
  return gulp.src('require.config.js')
    .pipe(gulp.dest('./dist/assets/js'))
}

gulp.task('require-js', requireJs);