var gulp       = require('gulp'),
    concat     = require('gulp-concat');
 
gulp.task('scripts', function(){					//создание одного файла js
	return gulp.src([
		'js/index.js',
        'js/team.js',
		'js/unit.js'
		
		])
	.pipe(concat('script.js'))
	//.pipe(uglify())
	.pipe(gulp.dest('js'));
});
