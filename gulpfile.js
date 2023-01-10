const { src, dest, watch, parallel } = require('gulp');

//CSS
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');

//Imagenes
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

//JavaScript
const terser = require('gulp-terser-js');

//Funcion que compila SASS
const paths = {
    imagenes: 'src/img/**/*.{png,jpg}',
    scss: 'src/scss/**/*.scss',
    js: 'src/js/**/*.js'
}

function css(done) {
    src(paths.scss)
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/css'))
    done();
}

function imagenes(done) {
    const opciones = {
        optimizationLevel: 3
    };
    src(paths.imagenes)
        .pipe(cache(imagemin(opciones)))
        .pipe(dest('build/img'))
    done();
}


function versionWebp(done) {
    const opciones = {
        quality: 50
    };
    src(paths.imagenes)
        .pipe(webp(opciones))
        .pipe(dest('build/img'))
    done();
}

function versionAvif(done) {
    const opciones = {
        quality: 50
    };
    src(paths.imagenes)
        .pipe(avif(opciones))
        .pipe(dest('build/img'))
    done();
}

function javascript(done) {
    src(paths.js)
        .pipe(sourcemaps.init())
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/js'))
    done();
}

function dev(done) {
    watch(paths.scss, css); //* = La carpeta Actual - ** Todos los archivos con esa extension
    watch(paths.js, javascript);
    done();
}

exports.css = css;
exports.javascript = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(imagenes, versionWebp, css, javascript, versionAvif, dev);