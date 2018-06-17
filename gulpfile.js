const gulp    = require('gulp');
const ts      = require('gulp-typescript');
const tslint  = require('gulp-tslint');
const del     = require('del');
const nodemon = require('gulp-nodemon');

const tsProject = ts.createProject('./tsconfig.json');

gulp.task('ts:clean', (done) => {
  del(['./**/*.js', '!./migrations/*.js', '!./gulpfile.js', '!./node_modules/**/*']).then((paths) => {
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

gulp.task('server:start', (done) => {
  const stream = nodemon({
    script: './bin/www',
    ext: 'ts',
    tasks: ['ts:build']
  });
  stream
  .on('restart', () => {
    console.log('restarted!');
  }).on('crash', () => {
    console.log('crashed!');
    stream.emit('restart', 10);
  });
});

gulp.task('ts:watch', () => {
  gulp.watch('./src/**/*.ts', gulp.series('ts:build'));
});

gulp.task('default', gulp.series('server:start'));
