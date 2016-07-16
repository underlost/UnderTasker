/*!
 * UnderTasker
 * Copyright 2016 Tyler Rilling
 * Licensed under MIT (https://github.com/underlost/Undertasker/blob/master/LICENSE)
 */

// grab our packages
var gulp   = require('gulp'),
    child = require('child_process');
    jshint = require('gulp-jshint');
    sass = require('gulp-sass');
    sourcemaps = require('gulp-sourcemaps');
    concat = require('gulp-concat');
    autoprefixer = require('gulp-autoprefixer');
    minifyCSS = require('gulp-minify-css');
    rename = require('gulp-rename'); // to rename any file
    uglify = require('gulp-uglify');
    del = require('del');
    stylish = require('jshint-stylish');
    runSequence = require('run-sequence');
    coffee = require('gulp-coffee');
    gutil = require('gulp-util');
    bower = require('gulp-bower');
    imagemin = require('gulp-imagemin');
    ghPages = require('gulp-gh-pages');
    git = require('gulp-deploy-git');

// Cleans the web dist folder
gulp.task('clean', function (cb) {
    del(['dist/**/*', 'source/site/dist/**/*'], cb);
});

// Copy images
gulp.task('copy-dist', function() {
    gulp.src('dist/**/*.*')
    .pipe(gulp.dest('source/site/dist'));
});

// Copy fonts task
gulp.task('copy-fonts', function() {
    gulp.src('source/fonts/**/*.{ttf,woff,eof,svg,eot,woff2,otf}')
    .pipe(gulp.dest('dist/fonts'));
    // Copy Font scss
    gulp.src('bower_components/components-font-awesome/scss/**/*.scss')
    .pipe(gulp.dest('source/sass/font-awesome'));
    // Copy Font files
    gulp.src('bower_components/components-font-awesome/fonts/**/*.{ttf,woff,eof,svg,eot,woff2,otf}')
    .pipe(gulp.dest('dist/fonts'));
});

// Minify Images
gulp.task('imagemin', function() {
    gulp.src('source/img/**/*.{jpg,png,gif}')
	.pipe(imagemin())
	.pipe(gulp.dest('dist/img'))
});

// Copy Bower components
gulp.task('copy-bower', function() {
    gulp.src([
        'bower_components/jquery/dist/jquery.min.js',
    ])
    .pipe(gulp.dest('dist/js/lib'));

    gulp.src('bower_components/components-font-awesome/scss/**/*.*')
    .pipe(gulp.dest('source/sass/font-awesome'));

    gulp.src('bower_components/bootstrap-sass/assets/stylesheets/**/*.*')
    .pipe(gulp.dest('source/sass/bootstrap'));
});

// Compile coffeescript to JS
gulp.task('brew-coffee', function() {
    gulp.src('source/coffee/*.coffee')
        .pipe(coffee({bare: true}).on('error', gutil.log))
        .pipe(gulp.dest('source/js/coffee/'))
});

// CSS Build Task
gulp.task('build-css', function() {
  return gulp.src('source/sass/site.scss')
    .pipe(sourcemaps.init())  // Process the original sources
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write()) // Add the map to modified source.
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('dist/css'))
    .pipe(minifyCSS())
    .pipe(rename('site.min.css'))
    .pipe(gulp.dest('dist/css'))
    .on('error', sass.logError)
});

// Concat All JS into unminified single file
gulp.task('concat-js', function() {
    return gulp.src([
        // Bower components
        'bower_components/bootstrap-sass/assets/javascripts/bootstrap.js',
        'source/js/site.js',
        // Coffeescript
        'source/js/coffee/*.*',

    ])
    .pipe(sourcemaps.init())
        .pipe(concat('site.js'))
        .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('dist/js'));
});

// configure the jshint task
gulp.task('jshint', function() {
    return gulp.src('source/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

// Shrinks all the js
gulp.task('shrink-js', function() {
    return gulp.src('dist/js/site.js')
    .pipe(uglify())
    .pipe(rename('site.min.js'))
    .pipe(gulp.dest('dist/js'))
});

// Default Javascript build task
gulp.task('build-js', function(callback) {
    runSequence('concat-js', callback);
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
    gulp.watch('source/coffee/**/*.js', ['brew-coffee']);
    gulp.watch('source/js/**/*.js', ['build-js']);
    gulp.watch('source/sass/**/*.scss', ['build-css']);
});

gulp.task('bower', function() {
    return bower({ cmd: 'update'});
});

gulp.task('github', function() {
    runSequence('build', callback);
    return gulp.src('./source/**/*')
    .pipe(ghPages());
});

gulp.task('jekyll', function() {
    const jekyll = child.spawn('jekyll', ['serve', '--watch', '--incremental', '--drafts' ]);

    const jekyllLogger = (buffer) => {
        buffer.toString()
        .split(/\n/)
        .forEach((message) => gutil.log('Jekyll: ' + message));
    };

    jekyll.stdout.on('data', jekyllLogger);
    jekyll.stderr.on('data', jekyllLogger);
});

// Default build task
gulp.task('build', function(callback) {
    runSequence(
        'copy-fonts', 'copy-bower', 'imagemin', 'bower',
        ['build-css', 'build-js'],
        ['shrink-js', 'copy-bower'],
        ['copy-dist', ], callback
    );
});

gulp.task('deploy', function() {
    return gulp.src('./source/**/*')
    .pipe(git({
        repository: 'https://github.com/underlost/UnderTasker.git',
        branches: ['gh_pages'],
        message: 'Deployed with UnderTasker.'
    }));
});
