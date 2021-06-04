import gulp from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import browserSyncModule from 'browser-sync';
import terser from 'gulp-terser';
import imagemin from 'gulp-imagemin';

const browserSync = browserSyncModule.create();

const path = {
  input: {
    js: ['src/js/**/*.js'],
    scss: ['src/scss/**/*.scss'],
    img: ['src/img/**/*.+(jpg|jpeg|gif|png|svg|ico)'],
  },

  output: {
    js: 'dist/js',
    css: 'dist/css',
    img: 'dist/img',
  },

  otherPaths: {
    baseDir: './',
    startDir: './pages',
    html: ['pages/*.html'],
  },
};

export function compileSass() {
  return gulp
    .src(path.input.scss)
    .pipe(
      sass({
        outputStyle: 'compressed',
      }),
    )
    .pipe(
      autoprefixer({
        cascade: false,
      }),
    )
    .pipe(gulp.dest(path.output.css))
    .pipe(browserSync.stream());
}

export function browserWatch() {
  browserSync.init({
    startPath: path.otherPaths.startDir,
    server: {
      baseDir: path.otherPaths.baseDir,
    },
  });

  gulp.watch(path.input.scss, compileSass);
  gulp.watch(path.input.js, minifyJs);
  gulp.watch(path.input.img, minifyImage);
  gulp.watch(path.otherPaths.html).on('change', browserSync.reload);
}

export function minifyJs() {
  return gulp
    .src(path.input.js)
    .pipe(terser())
    .pipe(gulp.dest(path.output.js))
    .pipe(browserSync.stream());
}

export function minifyImage() {
  return gulp
    .src(path.input.img)
    .pipe(imagemin())
    .pipe(gulp.dest(path.output.img))
    .pipe(browserSync.stream());
}

export default gulp.parallel(browserWatch, minifyJs, compileSass, minifyImage);
