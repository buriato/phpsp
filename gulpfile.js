const gulp = require('gulp'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	browserSync = require('browser-sync').create(),
	autoprefixer = require('gulp-autoprefixer'),
	cssunit = require('gulp-css-unit'),
	notify = require("gulp-notify");



function server() {
	browserSync.init({
		proxy: "localhost/oop-php/app",
		open: false
	});
	browserSync.watch('app/**/*.*', browserSync.reload);
}


function styles() {
	return gulp.src('app/sass/main.sass')
		.pipe(sourcemaps.init())
		.pipe(sass({
			outputStyle: 'expanded'
		})).on("error", notify.onError())
		.pipe(autoprefixer(['last 15 versions']))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({
			stream: true
		}));
}


//scripts

function scripts() {
	return gulp.src('./node_modules/jquery/dist/jquery.min.js')
		.pipe(gulp.dest('./app/js/'));
}

//gulp watch


function watch() {
	gulp.watch('app/sass/**/*.*', styles);
	gulp.watch('app/**/*.php', browserSync.reload);
}



// gulp.task('default', ['watch']);

gulp.task('default', gulp.series(
	scripts,
	styles,
	gulp.parallel(watch, server)
));