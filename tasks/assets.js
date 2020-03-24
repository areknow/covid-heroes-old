const gulp = require('gulp');
const del = require("del");

function assets() {
  return gulp.src('_assets/**')
    .pipe(gulp.dest('./dist/assets'))
}
function clearAssets() {
  return del(["./dist/assets/images", "./dist/assets/vendor"]);
}