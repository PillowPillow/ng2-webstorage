const gulp = require('gulp');
const babel = require('gulp-babel');


gulp.task('default', () =>
    gulp.src('./dist/**/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist'))
);