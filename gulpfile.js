var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer'),
    cache = require('gulp-cache'),
    concat = require('gulp-concat'),
    cssnano = require('gulp-cssnano'),
    imagemin = require('gulp-imagemin'),
    rigger = require('gulp-rigger'),
    svgo = require('gulp-svgo'),
    uglify = require('gulp-uglify'),
    pngQuant = require('imagemin-pngquant');

gulp.task('sass', () => {
  return gulp.src('app/scss/**/*.scss')
             .pipe(sass({outputStyle: 'expanded'})
                    .on('error', sass.logError))
             .pipe(autoprefixer(['last 4 versions', '> 1%'], 
                                  {cascade: true}))
             .pipe(gulp.dest('app/css'))
             .pipe(browserSync.reload({stream: true}));
});

gulp.task('clean', () => {
  return del.sync('dist');
});

gulp.task('clearCache', () => {
  return cache.clearAll();
});

gulp.task('browser-sync', () => {
  browserSync({
    server: {
      baseDir: 'app'
    },
    notify: false
  });
});

gulp.task('img', () => {
  return gulp.src('app/img/**/*')
            .pipe(
              cache(
                imagemin({
                  interlaced:true,
                  pregressive: true,
                  svgoPlugins: [{removeViewBox: false}],
                  use:[pngQuant()]
                })
              )
            )
            .pipe(gulp.dest('dist/img'));
});

gulp.task('svg', () => {
  return gulp.src('app/svg/**/*')
            .pipe(svgo())
            .pipe(gulp.dest('dist/svg'));
});

gulp.task('watch', ['browser-sync', 'sass'], () => {
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/**/*.html', browserSync.reload);
});

gulp.task('build', ['clean', 'sass', 'img'], () => {
  var buildHtml = gulp.src('app/*.html')
                      .pipe(gulp.dest('dist'));
  var buildCss = gulp.src('app/css/**/*.css')
                    .pipe(gulp.dest('dist/css'));
});

gulp.task('build:html', () => {
  return gulp.src('app/*.html')
            .pipe(rigger())
            .pipe(gulp.dest('dist'));
});

gulp.task('default', ['watch']);