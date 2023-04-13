/**
*!/usr/bin/env node
* -*- coding: utf-8 -*-
* GulpJS Boilerplate
*/


/**
* author: Exfac
* copyright: Copyright 2023 - new Date().getFullYear(), Exfac Inc.
* credits: ["Mr. O"]
* version: process.env.GULPJS_BOILERPLATE_VERSION
* maintainer: OTechCup
* email: support@exfac.info
* status: process.env.GULPJS_BOILERPLATE_ENVIRONMENT_STATUS
*/


// import modules
const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");
const terser = require("gulp-terser");
const browsersync = require("browser-sync").create();


function scss_task() {
  return (
    src("public/static/assets/scss/App.scss", {sourcemaps: true})
      .pipe(sass())
      .pipe(postcss([cssnano()]))
      .pipe(dest("public/static/assets/css", {sourcemaps: "."}))
  );
};


function js_task() {
  return (
    src("public/static/assets/main_js/App.js", {sourcemaps: true})
      .pipe(terser())
      .pipe(dest("public/static/assets/js", {sourcemaps: "."}))
  );
};


function browsersync_serve(callback) {
  browsersync.init({
    server: {baseDir: "public"},
  });

  callback();
};


function browsersync_reload(callback) {
  browsersync.reload();

  callback();
};


function watch_task() {
  watch("*.html", browsersync_reload);
  watch(
    [
      "public/static/assets/scss/**/*.scss",
      "public/static/assets/main_js/**/*.js",
    ],
    series(scss_task, js_task, browsersync_reload),
  );
};


exports.default = series(
  scss_task, js_task, browsersync_serve, watch_task
);
