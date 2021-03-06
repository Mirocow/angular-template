var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var shell = require('gulp-shell');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var browserSync = require('browser-sync').create();

gulp.task('vendors-js', function () {
 gulp.src([
      'bower_components/jquery/dist/jquery.js',
      'bower_components/bootstrap/dist/js/bootstrap.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-ui-grid/ui-grid.js',
      //'bower_components/angular-aria/angular-aria.js',
      //'bower_components/angular-material/angular-material.js',
      'bower_components/ngstorage/ngStorage.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/ui-router/release/angular-ui-router.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-block-ui/dist/angular-block-ui.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/restangular/dist/restangular.js',
      'bower_components/underscore/underscore.js',
      'bower_components/angular-bootstrap/ui-bootstrap.js',
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
    ])
   .pipe(ngAnnotate())
   .pipe(concat('vendors.js'))
   //.pipe(uglify())
   .pipe(sourcemaps.write())
   .pipe(gulp.dest('./app/assets'))
   .pipe(browserSync.reload({stream: true}));
});

gulp.task('app-js', function () {
 gulp.src([
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

gulp.task('js', function () {
  gulp.run('vendors-js');
  gulp.run('app-js');
});

gulp.task('vendors-css', function () {
 gulp.src([
      'bower_components/bootstrap/dist/css/bootstrap.css',
      'bower_components/angular-bootstrap/ui-bootstrap-csp.css',
      'bower_components/angular-block-ui/dist/angular-block-ui.css',
      'bower_components/angular-ui-grid/ui-grid.min.css',
      //'bower_components/angular-material/angular-material.layouts.min.css',
      //'bower_components/angular-material/angular-material.min.css',
    ])
    //.pipe(ngAnnotate())
    .pipe($.replace('bower_components/bootstrap-sass-official/vendor/assets/fonts/bootstrap','./app/assets'))
    .pipe(concat("vendors.css"))
    .pipe(gulp.dest('./app/assets'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('app-css', function () {
 gulp.src([
      'src/css/app.css',
      'src/states/**/*.css',
    ])
    //.pipe(ngAnnotate())
    .pipe($.replace('bower_components/bootstrap-sass-official/vendor/assets/fonts/bootstrap','./app/assets'))
    .pipe(concat("app.css"))
    .pipe(gulp.dest('./app/assets'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('css', function () {
  gulp.run('vendors-css');
  gulp.run('app-css');
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

gulp.task('bootstrap-fonts', function () {
  gulp.src([
    'bower_components/bootstrap/fonts/*',
    ])
    .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
    .pipe($.flatten())
    .pipe(gulp.dest('app/fonts'))
    .pipe($.size());
});

gulp.task('ui-grid-fonts', function () {
  gulp.src([
    'bower_components/angular-ui-grid/*',
    ])
    .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
    .pipe($.flatten())
    .pipe(gulp.dest('app/assets'))
    .pipe($.size());
});

gulp.task('fonts', function () {
  gulp.run('bootstrap-fonts');
  gulp.run('ui-grid-fonts');
});

gulp.task('build', function () {
  gulp.run('css');
  gulp.run('js');
  gulp.run('fonts');
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