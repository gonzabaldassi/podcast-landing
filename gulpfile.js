const {src, dest, watch, series} = require('gulp');
const sass = require('sass')(require('gulp-sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');

//Imagenes
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');


function css(done) {
    src('./src/sass/main.scss')
        .pipe(
            sourcemaps.init()
        )
        .pipe(
            sass()
        )
        .pipe(
            postcss([autoprefixer(), cssnano()])
        )
        .pipe(
            sourcemaps.write('.')
        )
        .pipe(
            dest('./build/css')
        )
    done();
}

function img(done){
    src('./src/img/**/*')
        .pipe(
            imagemin({optimizationLevel:3})
        )
        .pipe(
            dest('./build/img')
        )
    done();
}

function versionWebp(done){
    src('./src/img/**/*.{jpg, png}')
        .pipe(
            webp()
        )
        .pipe(
            dest('./build/img')
        )
    done();
}
function versionAvif(done){
    src('./src/img/**/*.{jpg, png}')
        .pipe(
            avif()
        )
        .pipe(
            dest('./build/img')
        )
    done();
}

function dev(){
    watch('./src/sass/**/*.scss', css);
    watch('./src/img/**/*', img);
}

exports.css = css;
exports.img = img;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;

exports.default = series(img, versionWebp, versionAvif, css, dev);