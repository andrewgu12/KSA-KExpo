"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const path = require("path");
const baseRoutes = require("./routes/index");
const app = express();
app.use(helmet());
app.set('views', path.join(__dirname, 'public/views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', baseRoutes);
// Catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found!');
    next(err);
});
// Error Handlers
if (process.env.NODE_ENV === 'development') {
    app.locals.pretty = true;
    app.use((err, req, res, next) => {
        res.status(err.code || 500);
        res.render('404', {
            message: err.message,
            error: err
        });
    });
}
else { // production
    app.use((err, req, res, next) => {
        app.locals.pretty = true;
        res.status(err.code || 500);
        res.render('404', {
            message: err.message,
            error: {}
        });
    });
}
module.exports = app;
