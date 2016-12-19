'use strict';
 
var gulp        = require('gulp'),
	sass        = require('gulp-sass'),

gulp.task('sass', function(){
	return gulp.src('resourses/sass/**/*.scss')//или sass
		.pipe(sass())
		.pipe(gulp.dest('public/css'))
});

