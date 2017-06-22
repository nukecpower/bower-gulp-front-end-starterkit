var gulp = require('gulp'),
    sass = require('gulp-ruby-sass')
    notify = require("gulp-notify"),
	concat = require('gulp-concat'),
    bower = require('gulp-bower');

var config = {
    devPath: './ui/_dev',
	assetsPath: './ui/assets',
    bowerDir: './bower_components'
}

gulp.task('bower', function() {
    return bower()
        .pipe(gulp.dest(config.bowerDir))
});

gulp.task('icons', function() {
	return gulp.src([
            config.bowerDir + '/font-awesome/fonts/**.*',
            config.bowerDir + '/bootstrap-sass/assets/fonts/bootstrap/**.*' ])
		.pipe(gulp.dest(config.assetsPath + '/fonts'));
});

gulp.task('js', function() {
  return gulp.src([config.devPath + '/js/plugins/*.js', config.devPath + '/js/*.js'])
    .pipe(concat('site.js'))
    .pipe(gulp.dest(config.assetsPath + '/js'));
});

gulp.task('jsvendors', function() {
	return gulp.src([
            config.bowerDir + '/jquery/dist/jquery.min.js',
            config.bowerDir + '/bootstrap-sass/assets/javascripts/bootstrap.min.js'
		])
		.on("error", notify.onError(function (error) {
			return "Error: " + error.message;
		}))
		.pipe(gulp.dest(config.assetsPath + '/js'));
});


gulp.task('css', function() {
    return gulp.src(config.devPath + '/css/styles.scss')
        .pipe(sass({
            loadPath: [
                config.devPath + '/css/sass',
                config.bowerDir + '/bootstrap-sass/assets/stylesheets',
                config.bowerDir + '/font-awesome/scss',
            ]
        })
		.on("error", notify.onError(function (error) {
			return "Error: " + error.message;
		})))
        .pipe(gulp.dest(config.assetsPath + '/css'));
});


// Rerun the task when a file changes
gulp.task('watch', function() {
    gulp.watch(config.devPath + '/**/*.scss', ['css']);
	gulp.watch(config.devPath + '/**/*.js', ['js','jsvendors']);
});

gulp.task('default', ['bower', 'icons', 'css']);
