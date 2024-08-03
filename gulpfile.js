const { src, dest, watch, series } = require('gulp');
const pug = require('gulp-pug');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify-es').default;
const { rimraf } = require('rimraf');

const PATH = {
    src: 'src',
    build: 'dist'
};

function compilePug() {
    return src(`${PATH.src}/templates/*.pug`)
        .pipe(pug())
        .pipe(dest(`${PATH.build}`));
}

function compileSass() {
    return src(`${PATH.src}/scss/app.scss`)
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(dest(`${PATH.build}/css`))
        .pipe(browserSync.stream());
}

function watchFiles() {
    browserSync.init({
        server: {
            baseDir: PATH.build
        }
    });

    watch(`${PATH.src}/**/*.pug`, compilePug);
    watch(`${PATH.src}/**/*.scss`, compileSass);
    watch(`${PATH.src}/**/*.js`, compressJs);
    watch(`${PATH.src}/**/*.{png,jpg,gif,webp}`, copyImg);
    watch(`${PATH.build}/**/*.html`).on('change', browserSync.reload);
}

function compressJs() {
    return src(`${PATH.src}/js/*.js`)
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(dest(`${PATH.build}/js`))
        .pipe(browserSync.stream());
}

function copyImg() {
    return src(`${PATH.src}/img/**`, {
        encoding: false
    }).pipe(dest(`${PATH.build}/img`));
}

function cleanBuild() {
    return rimraf(PATH.build);
}

exports.default = series(
    cleanBuild,
    compilePug,
    compileSass,
    compressJs,
    copyImg,
    watchFiles
);

exports.build = series(
    cleanBuild,
    compilePug,
    compileSass,
    compressJs,
    copyImg
);
