const gulp = require('gulp');
const requireJs = require('../tasks/require');

gulp.task('require-js', requireJs);
gulp.task('assets', assets);
gulp.task('bundle', bundle);
gulp.task('minify', minify);
gulp.task('scripts', scripts);
gulp.task('styles', styles);
gulp.task('hbs-root', hbsRoot);
gulp.task('hbs-dirs', hbsDirs);
gulp.task('hbs', gulp.series('hbs-root', 'hbs-dirs'));

gulp.task('build', gulp.series('require-js', gulp.series('scripts', 'minify'), 'styles', 'hbs', 'assets'));
