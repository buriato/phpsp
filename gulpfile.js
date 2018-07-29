const gulp = require('gulp'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	browserSync = require('browser-sync').create(),
	autoprefixer = require('gulp-autoprefixer'),
	cssunit = require('gulp-css-unit'),
	notify = require("gulp-notify");

// Сервер и автообновление страницы Browsersync
// gulp.task('browser-sync', function () {
// 	browserSync.init({
// 		proxy: "localhost/oop-php/"
// 	});
// });

function server() {
	browserSync.init({
		proxy: "localhost/oop-php/app",
		open: false
	});
	browserSync.watch('app/**/*.*', browserSync.reload);
}


// gulp.task('sass', function () {
// 	return gulp.src('app/sass/**/*.sass')
// 		.pipe(sass({
// 			outputStyle: 'expand'
// 		}).on("error", notify.onError()))
// 		.pipe(autoprefixer(['last 15 versions']))
// 		.pipe(gulp.dest('app/css'))
// 		.pipe(browserSync.reload({
// 			stream: true
// 		}));
// });

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

//gulp watch


function watch() {
	gulp.watch('app/sass/**/*.*', styles);
	gulp.watch('app/**/*.php', browserSync.reload);
}

// gulp.task('watch', ['sass', 'browser-sync'], function () {
// 	gulp.watch('app/sass/**/*.sass', ['sass']);
// 	gulp.watch('app/**/*.php', browserSync.reload);
// });

// gulp.task('default', ['watch']);

gulp.task('default', gulp.series(
	styles,
	gulp.parallel(watch, server)
));