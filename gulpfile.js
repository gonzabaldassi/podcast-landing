const {src, dest, watch, series} = require('gulp');
const sass = require('sass')(require('gulp-sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');

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