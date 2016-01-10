var gulp = require('gulp');
var shell = require('gulp-shell');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var browserSync = require('browser-sync').create();

gulp.task('js', function () {
 gulp.src([
      'bower_components/jquery/dist/jquery.js',
      'bower_components/bootstrap/dist/js/bootstrap.js',
      'bower_components/angular/angular.js',
      'bower_components/ngstorage/ngStorage.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/ui-router/release/angular-ui-router.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-block-ui/dist/angular-block-ui.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/restangular/dist/restangular.js',
      'bower_components/underscore/underscore.js',
      'src/js/app.js',
      'src/js/directives/*.js',
      'src/js/factories/*.js',
      'src/js/filters/*.js',
      'src/js/services/*.js',
      'src/js/providers/*.js',
      'src/js/controllers/*.js',
      'src/states/**/*.js',
    ])
   .pipe(ngAnnotate())
   .pipe(concat('app.js'))
   //.pipe(uglify())
   .pipe(sourcemaps.write())
   .pipe(gulp.dest('./app/assets'))
   .pipe(browserSync.reload({stream: true}));
});

gulp.task('css', function () {
 gulp.src([
      'bower_components/bootstrap/dist/css/bootstrap.css',
      'bower_components/angular-block-ui/dist/angular-block-ui.css',
      'src/css/app.css',
      'src/states/**/*.css',
    ])
    //.pipe(ngAnnotate())
    .pipe(concat("app.css"))
    .pipe(gulp.dest('./app/assets'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('docs', shell.task([
  'node_modules/jsdoc/jsdoc.js '+
    '-c node_modules/angular-jsdoc/common/conf.json '+   // config file
    '-t node_modules/angular-jsdoc/angular-template '+   // template file
    '-d build/docs '+                           // output directory
    './README.md ' +                            // to include README.md as index contents
    '-r directives services'  +                 // source code directory
    '-u tutorials'                              // tutorials directory
]));

gulp.task('html', function () {
  gulp.src([
      './src/states/**/*.html'
    ])
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./app/partials/states'))
    .pipe(browserSync.reload({stream: true}));
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
  gulp.watch('src/states/**/*.html');
});

gulp.task('webserver', function() {
  browserSync.init({
      port: 8000,
      server: {
          //directory: true,
          baseDir:  './app',
          index: "index.html"
      },
      ui: {
          port: 8001,
      },
      ghostMode: {
        clicks: true,
        forms: true,
        scroll: false
      },
      open: false
  });
});

gulp.task('default', ['build', 'webserver', 'watch']);