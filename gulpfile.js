/* global require */
var gulp = require("gulp"),
    browserSync = require("browser-sync"),
    del = require("del"),
    gutil = require("gulp-util"),
    minifyCss = require("gulp-minify-css"),
    concatCss = require("gulp-concat-css"),
    rename = require("gulp-rename"),
    gulpif = require("gulp-if"),
    uglify = require("gulp-uglify"),
    imagemin = require("gulp-imagemin"),
    autoprefixer = require("gulp-autoprefixer"),
    filter = require("gulp-filter"),
    ftp = require("vinyl-ftp"),
    wiredep = require("wiredep").stream,
    useref = require("gulp-useref"),
    size = require("gulp-size");

/*******************************************
 * APP
 ******************************************/
// Запускаем локальный сервер
gulp.task('server', function () {
  browserSync ({
     port: 9000,
     server: {
          baseDir: 'app'
     }
  });
});
gulp.task( 'wiredep-bower' , function () {
  gulp.src('app/*.html')
  .pipe( wiredep ({
    directory: 'app/bower'
  }) )
  .pipe(gulp.dest( 'app' ));
});

gulp.task("bower-json", function () {
  return gulp.watch("bower.json", ["wiredep-bower"]);
});

// Следим за файлами


gulp.task("watch", function () {
    gulp.watch([
        "app/*.html",
        "app/css/*.css",
        "app/js/*.js"
    ]).on("change", browserSync.reload);
});

// Дефолтный task
gulp.task("default", ["server", "wiredep-bower", "bower-json", "watch"]);

var log = function (error) {
    console.log([
        "",
        "----------ERROR MESSAGE START----------",
        ("[" + error.name + " in " + error.plugin + "]"),
        error.message,
        "----------ERROR MESSAGE END----------",
        ""
    ].join("\n"));
    this.end();
}


/*******************************************
 * DIST
 ******************************************/
// Переносим CSS JS HTML в папку DIST
gulp.task("useref", function () {
    var assets = useref.assets();
    return gulp.src("./app/*.html")
        .pipe(assets)
        .pipe(gulpif("*.js", uglify()))
        .pipe(gulpif("*.css", minifyCss({compatibility: "ie8"})))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest("dist"));
});

// Очищаем директорию DIST
gulp.task("clean-dist", function () {
    return del(["./dist/**", "!./dist/"]);
});

// Запускаем локальный сервер для DIST
gulp.task("dist-server", function () {
    browserSync.init({
        notify: false,
        port: 2000,
        server: { baseDir: "./dist" }
    });
});

// Перенос шрифтов
gulp.task("fonts", function() {
    gulp.src("./app/fonts/*")
        .pipe(filter(["*.eot","*.svg","*.ttf","*.woff","*.woff2"]))
        .pipe(gulp.dest("./dist/fonts/"))
});

// Перенос картинок
gulp.task("images", function () {
    return gulp.src("./app/img/**/*")
            .pipe(imagemin({
                progressive: true,
                interlaced: true
            }))
            .pipe(gulp.dest("./dist/img"));
});

// Перенос остальных файлов (favicon и т.д.)
gulp.task("extras", function () {
    return gulp.src(["./app/*.*", "!./app/*.html"])
            .pipe(gulp.dest("./dist"));
});

// Вывод размера папки APP
gulp.task("size-app", function () {
    return gulp.src("app/**/*").pipe(size({title: "APP size: "}));
});

// Сборка и вывод размера папки DIST
gulp.task("dist", ["useref", "images", "fonts", "extras", "size-app"], function () {
    return gulp.src("dist/**/*").pipe(size({title: "DIST size: "}));
});

// Собираем папку DIST - только когда файлы готовы
gulp.task("build", ["clean-dist", "wiredep-bower"], function () {
    gulp.start("dist");
});

// Отправка проекта на сервер
gulp.task("deploy", function() {
    var conn = ftp.create({
        host: "host", 
        user: "user",
        password: "password",
        parallel: 10,
        log: gutil.log
    });

    return gulp.src(["./dist/**/*"], { base: "./dist/", buffer: false})
            .pipe(conn.dest("/public_html/"));
});