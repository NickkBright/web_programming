'use strict';
 
var gulp        = require('gulp'),
	sass        = require('gulp-sass'),
	browserSync = require('browser-sync');

var config = {
    distDir:  './public',
    nodeDir: './node_modules'
}


gulp.task('node-to-public', function () {
  gulp.src(config.nodeDir + '/**')
    .pipe(gulp.dest(config.distDir +'/node_modules'));
});



gulp.task('sass', function(){
	return gulp.src('resourses/sass/**/*.scss')//или sass
		.pipe(sass())
		.pipe(gulp.dest('public/css'))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function(){
	browserSync({
		server: {
			baseDir: 'public'//запускаю сервер для папки 
		},
		notify: false//отключаю уведомление
	})
});


gulp.task('watch',['browser-sync','sass', 'bower-to-public'], function(){
	gulp.watch('resourses/sass/**/*.scss', ['sass']);
	gulp.watch('public/*.html', browserSync.reload);
	gulp.watch('public/js/**/*.js', browserSync.reload);
});

