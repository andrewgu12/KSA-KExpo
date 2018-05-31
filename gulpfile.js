import * as gulp from "gulp";
import * as ts from "gulp-typescript";
import * as tslint from "gulp-tslint";
import * as del from "del";

const tsProject = ts.createProject("./tsconfig.json");

gulp.task('ts:clean', (done) => {
  del(['./**/*.js', '!./tasks/*.js', '!./gulpfile.js', '!./node_modules/']).then((paths) => {
    done();
  });
});

// There's a problem with this package - use linting in VSCode
gulp.task('ts:lint', () => {
  return gulp.src('./src/**/*.ts').pipe(tslint({
    formatter: 'verbose'
  })).pipe(tslint.report());
});

gulp.task('ts:compile', (done) => { 
  return gulp.src('./src/**/*.ts').pipe(tsProject()).pipe(gulp.dest('.'));
});

gulp.task('ts:build', gulp.series('ts:clean', 'ts:compile'));
gulp.task('ts:watch', () => {
  gulp.watch('./src/**/*.ts', gulp.series('ts:build'));
});

gulp.task('default', gulp.series('ts:watch'));