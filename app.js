"use strict";
exports.__esModule = true;
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
// import in routes
var baseRoutes = require("./routes/index");
var adminRoutes = require("./routes/results");
// const userRoutes  = require("./routes/vote");
var app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));
app.use(logger("dev"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Routes
app.use("/", baseRoutes);
app.use("/results", adminRoutes);
// app.use("/vote", userRoutes);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error("Not Found");
    err.code = 404;
    next(err);
});
// error handlers
// development error handler
// will print stacktrace
if (app.get("env") === "development") {
    app.locals.pretty = true;
    app.use(function (err, req, res, next) {
        res.status(err.code || 500);
        res.render("error", {
            message: err.message,
            error: err
        });
    });
}
// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    app.locals.pretty = true;
    res.status(err.status || 500);
    res.render("error", {
        message: err.message,
        error: {}
    });
});
module.exports = app;
