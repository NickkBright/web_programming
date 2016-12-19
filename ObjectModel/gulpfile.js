var browserify = require('browserify'),
    gulp       = require('gulp'),
    sourceFile = './build/main.js',
    destFolder = './js/',
    destFile   = 'findem.js';
 
gulp.task('browserify', function() {
  return browserify(sourceFile)
  .bundle()
  .pipe(source(destFile))
  .pipe(gulp.dest(destFolder));
});

gulp.task('watch', function() {
  var bundler = watchify(browserify(sourceFile));
  bundler.on('update', rebundle);
 
  function rebundle() {
    return bundler.bundle()
      .pipe(source(destFile))
      .pipe(gulp.dest(destFolder));
  }
 
  return rebundle();
});

gulp.task('default', ['browserify', 'watch'], function () {
  gutil.log('Gulp has finished building the project!');
  process.exit(0);
})