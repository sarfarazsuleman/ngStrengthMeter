(function () {
  'use strict';

  //Distribution Root
  var distRoot = './dist';

  //Paths
  var paths = {
    templates: ['src/**/*.html'],

    images: ['src/images/**/*.*'],

    js: [
      'src/global/js/**/*.js',
      'src/components/**/*.js',
      'src/app/**/*.js'
    ],

    sass: [
      'src/global/scss/**/*.scss',
      'src/components/**/*.scss',
      'src/app/**/*.scss'
    ],

    roots: {
      base: distRoot,
      template: distRoot+'/templates',
      images: distRoot+'/images',
    }
  }

  //Sass Options
  var sassOptions = {
    errLogToConsole: true,
    outputStyle: 'compressed'
  };

  //Dependencies
  var
    gulp            = require('gulp'),
    concat          = require('gulp-concat'),
    jshint          = require('gulp-jshint'),
    ngAnnotate      = require('gulp-ng-annotate'),
    rename          = require('gulp-rename'),
    sass            = require('gulp-sass'),
    uglify          = require('gulp-uglify'),
    gutil           = require('gulp-util'),
    watch           = require('gulp-watch'),
    mainBowerFiles  = require('main-bower-files');

  //Gulp Tasks
  gulp.task('default',[]);

  gulp.task('build',['compileVendor','compileJs','compileSass','compileTemplates','compileImages']);
  gulp.task('develop',['watch']);

  gulp.task('compileImages', _compileImages);
  gulp.task('compileJs',['jshint'], _compileJs);
  gulp.task('compileSass',_compileSass);
  gulp.task('compileTemplates',_compileTemplates);
  gulp.task('compileVendor',_compileVendor);

  gulp.task('jshint',_jsHint);

  gulp.task('watch',_watch);


  //Functions
  function _compileImages() {
    return gulp.src(paths.images)
      .pipe(gulp.dest(paths.roots.images));
  }

  function _compileJs() {
    return gulp.src(paths.js)
      .pipe(concat('app.js')
        .on('error',_handleErr))
      .pipe(ngAnnotate()
        .on('error',_handleErr))
//      .pipe(uglify()
//        .on('error',_handleErr))
      .pipe(gulp.dest(paths.roots.base))
      .on('error',_handleErr);
  }

  function _compileSass() {
    return gulp.src(paths.sass)
      .pipe(concat('app.css'))
      .pipe(sass(sassOptions))
      .on('error',sass.logError)
      .pipe(gulp.dest(paths.roots.base));
  }

  function _compileTemplates() {
    return gulp.src(paths.templates)
      .pipe(gulp.dest(paths.roots.template));
  }

  function _compileVendor() {
    return gulp.src(mainBowerFiles())
      .pipe(concat('app.vendor.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest(paths.roots.base));
  }

  function _jsHint() {
    return gulp.src(paths.js)
      .pipe(jshint()
        .on('error',_handleErr))
      .pipe(jshint.reporter('jshint-stylish')
        .on('error',_handleErr));
  }

  function _watch() {
    watch(paths.js, function() {
      gulp.start('compileJs');
    });

    watch(paths.sass, function() {
      gulp.start('compileSass');
    });

    watch(paths.templates, function() {
      gulp.start('compileTemplates');
    });

    watch(paths.images, function() {
      gulp.start('compileImages');
    });
  }

  function _handleErr() {
    gutil.log;
    this.end();
  }
})();
