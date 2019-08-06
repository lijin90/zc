// 引入 gulp
var gulp = require('gulp');
var clean_css = require('gulp-clean-css')//css压缩
var uglify = require('gulp-uglify')//js压缩
var imagemin = require('gulp-imagemin');
// 压缩所有的css
gulp.task('allcss', function () {
    gulp.src('css/*.css')      //压缩的文件
        .pipe(clean_css()) //执行压缩
        .pipe(gulp.dest('dist/css'));
});
// //压缩所有的js
gulp.task('alljs', function () {
    gulp.src('js/*js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});
// 压缩图片
gulp.task('image', function () {
    gulp.src('image/*.{png,jpg,gif,ico}')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/image'));
});
//只要执行default任务，就相当于把one,two,three这三个任务执行了
gulp.task('default',['alljs','allcss','image']);