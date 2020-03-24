const gulp = require('gulp');
const browsersync = require("browser-sync").create();

function browserSync(done) {
  browsersync.init({
    open: false,
    ghostMode: false,
    server: { baseDir: './dist/' },
    port: 3000
  });
  done();
}

function browserSyncReload(done) {
  browsersync.reload();
  done();
}

function watchFiles() {
  gulp.watch("./_scss/**/*", styles);
  gulp.watch("./_ts/**/*", gulp.series('scripts', 'minify'));
  gulp.watch("./_data/**/*", gulp.series('hbs', browserSyncReload));
  gulp.watch("./_partials/**/*", gulp.series('hbs', browserSyncReload));
  gulp.watch("./_layouts/**/*", gulp.series('hbs', browserSyncReload));
  gulp.watch("./_pages/**/*", gulp.series('hbs', browserSyncReload));
  gulp.watch("./_assets/**/*", gulp.series(clearAssets, assets, browserSyncReload));
}

gulp.task('watch', gulp.series('build', gulp.parallel(watchFiles, browserSync)));