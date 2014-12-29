var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

var path = {
	js: './src/main.js'
};

gulp.task('js', function() {
	return 
		browserify(path.js)
		.bundle()
		.pipe(source('bundle.js'))
		.pipe(gulp.dest('./build/'));
});

gulp.task('watch', function(){
	gulp.watch(path.js, ['js']);
});