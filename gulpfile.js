const { src, dest, watch, series } = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const Fiber = require('fibers');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const del = require('del');
const path = {
    src: 'src',
    build: 'dist'
};

sass.compiler = require('sass');

function compilePug() {
    return src(`${path.src}/templates/*.pug`)
        .pipe(pug())
        .pipe(dest(`${path.build}`));
}

function compileSass() {
    return src(`${path.src}/scss/app.scss`)
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed',
            fiber: Fiber
        }).on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(dest(`${path.build}/css`))
        .pipe(browserSync.stream());
}

function watchFiles() {
    browserSync.init({
        server: {
            baseDir: path.build
        }
    });

    watch(`${path.src}/**/*.pug`, compilePug);
    watch(`${path.src}/**/*.scss`, compileSass);
    watch(`${path.src}/**/*.js`, concatJs);
    watch(`${path.build}/**/*.html`).on('change', browserSync.reload);
}

function concatJs() {
    return src(`${path.src}/js/*.js`)
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write())
        .pipe(dest(`${path.build}/js`))
        .pipe(browserSync.stream());
}

function cleanBuild() {
    return del(path.build);
}

exports.default = series(
    cleanBuild,
    compilePug,
    compileSass,
    concatJs,
    watchFiles
);
