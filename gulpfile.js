var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');

gulp.task('js', function () {
 gulp.src([
      'bower_components/jquery/dist/jquery.js',
      'bower_components/bootstrap/dist/js/bootstrap.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/ui-router/release/angular-ui-router.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-block-ui/dist/angular-block-ui.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/angular-animate/angular-animate.js',
      'src/js/app.js',
      'src/js/directives/*.js',
      'src/js/factories/*.js',
      'src/js/filters/*.js',
      'src/js/services/*.js',
      'src/js/providers/*.js',
      'src/js/controllers/*.js',
      'src/states/**/*.js',
    ])
   .pipe(concat('app.js'))
   .pipe(ngAnnotate())
   //.pipe(uglify())
   .pipe(sourcemaps.write())
   .pipe(gulp.dest('./app/assets'))
});

gulp.task('css', function () {
 gulp.src([
      'bower_components/bootstrap/dist/css/bootstrap.css',
      'bower_components/angular-block-ui/dist/angular-block-ui.css',
      'src/css/app.css',
      'src/states/**/*.css',
    ])
    .pipe(concat("app.css"))
    .pipe(gulp.dest('./app/assets'))
});

gulp.task('html', function () {
 gulp.src([
    'src/states/**/*.html',
 ])
 .pipe(ngAnnotate())
 .pipe(sourcemaps.write())
 .pipe(gulp.dest('./app/partials/states'))
});

gulp.task('build', function () {
 gulp.run('css');
 gulp.run('js');
 gulp.run('html');
});

gulp.task('watch', function () {
 gulp.watch('src/css/**/*.css');
 gulp.watch('src/js/app.js');
 gulp.watch('src/js/**/*.js');
 gulp.watch('src/states/**/*.css');
 gulp.watch('src/states/**/*.js');
});