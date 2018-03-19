const gulp             = require("gulp");
const sass             = require("gulp-sass");
const tsConfig         = require("./tsconfig.json");
const ts               = require("gulp-typescript");
const tslint           = require("gulp-tslint");
const nodemon          = require("gulp-nodemon");
// const webpack          = require("webpack");
// const webpackConfig    = require("./webpack.config.js");
const del              = require("del");

const tsProject = ts.createProject(tsConfig);

const tsCompile = () => {
  let tsResults = gulp.src("./src/**/*{ts,tsx}")
                      .pipe(tsProject());
  return tsResults.js.pipe(gulp.dest("."));
};

const tsLint = () => {
  return gulp.src("./src/**/*.{ts,tsx}").pipe(tslint()).pipe(tslint.report());
};

const styles = () => {
  return gulp.src("./src/public/sass/library.scss")
      .pipe(sass().on("error", sass.logError))
      .pipe(gulp.dest("./public/css/"));
};

// const serve = (done) => {
//   webpack(webpackConfig, (err, stats) => {
//     done();
//   });
// };

const clean = (done) => {
  del(["./public/javascript/*.js", "!./public/javascript/bundle.js"]).then(paths => {
    console.log("cleanup done");
    done();
  });
};

const watch = () => {
  gulp.watch("./src/**/*.ts", gulp.series(tsLint, tsCompile));
  gulp.watch("./src/public/sass/*.scss", gulp.series(styles));
  // gulp.watch("./src/**/*.tsx", gulp.series(tsLint, tsCompile, serve, clean));
};

const start = () => {
  nodemon({
    script: './bin/www'
  });
};

gulp.task("buildTS", gulp.series(tsLint, tsCompile, clean));
gulp.task("buildSCSS", gulp.series(styles));
gulp.task("build", gulp.parallel("buildTS", "buildSCSS"));
gulp.task("buildAndWatch", gulp.series(clean,"build", watch));
gulp.task('default', gulp.parallel("buildAndWatch", start));
