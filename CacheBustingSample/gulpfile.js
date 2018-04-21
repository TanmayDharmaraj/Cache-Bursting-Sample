const gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    runSequence = require('run-sequence'),
    rimraf = require('rimraf'),
	b2v = require('buffer-to-vinyl');

gulp.task("clean", function (cb) {
	rimraf("./Scripts/dist", cb);
});

gulp.task("js", function () {
	return gulp.src("./Scripts/src/**/*.js")
		.pipe(gulp.dest("./Scripts/dist/js"));
});

gulp.task('html', function () {
	return gulp.src(["./Scripts/src/**/*.html"])
		.pipe(gulp.dest("./Scripts/dist/views"));
});

gulp.task("revision-html", function () {
	return gulp.src(["./Scripts/dist/**/*.html"])
		.pipe($.rev())
		.pipe($.revDeleteOriginal())
		.pipe(gulp.dest("./Scripts/dist"))
		.pipe($.rev.manifest("rev-manifest-html.json"))
		.pipe(gulp.dest("./Scripts"));
});

gulp.task("ng-revision-constants", ["revision-html"], function () {
	var json = require('./Scripts/rev-manifest-html.json');
	var dummy_json = JSON.stringify({
	});
	return b2v.stream(new Buffer(dummy_json), 'rev-manifest-html.js')
		.pipe($.ngConfig('cachebusting.constants', {
			createModule: false,
			wrap: true,
			pretty: true,
			constants: {
				HTML: json
			}
		}))
		.pipe(gulp.dest("./Scripts"))
});

gulp.task("revision", ["ng-revision-constants"], function () {
	return gulp.src(["./Scripts/dist/**/*.js", "./Scripts/dist/**/*.css"])
		  .pipe($.rev())
          .pipe($.revDeleteOriginal())
		  .pipe(gulp.dest("./Scripts/dist"))
		  .pipe($.rev.manifest())
		  .pipe(gulp.dest("./Scripts"));
});

gulp.task("run", function () {
	runSequence("clean", "js", "html", "revision");
})