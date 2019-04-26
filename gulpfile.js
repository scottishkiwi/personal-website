var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cleanCSS = require('gulp-clean-css');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');

gulp.task('watch', function(){


    browserSync.init({
        server: {
          baseDir: 'app'
        },
    });

    var js = gulp.watch('app/js/**/*.js');
    js.on('change', function(){
        browserSync.reload();
    })
    var html = gulp.watch('app/*.html');
    html.on('change', function(){
        browserSync.reload();
    })
    var css = gulp.watch('app/scss/**/*.scss');
    css.on('change', function(){
        return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss
        .pipe(sass())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
          stream: true
        }))
    })
});

gulp.task('minify-css', () => {
    // Folder with files to minify
    return gulp.src('app/css/*.css')
    //The method pipe() allow you to chain multiple tasks together 
    //I execute the task to minify the files
   .pipe(cleanCSS())
   //I define the destination of the minified files with the method dest
   .pipe(gulp.dest('dist'));
});

gulp.task('uglify-js', () => {
    // Folder with files to minify
    return gulp.src('app/js/*.js')
    //The method pipe() allow you to chain multiple tasks together 
    //I execute the task to minify the files
   .pipe(uglify())
   //I define the destination of the minified files with the method dest
   .pipe(gulp.dest('dist'));
});

gulp.task('clean', function(){
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify()))
        // Minifies only if it's a CSS file
        .pipe(gulpIf('*.css', cleanCSS()))
        .pipe(gulp.dest('dist'))
  });

   



