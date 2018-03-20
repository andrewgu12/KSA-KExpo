"use strict";
/**
 * Home Page - for users
 */
var express = require("express");
var db = require("../db/connection");
var router = express.Router();
router.get("/", function (req, res, next) {
    res.render("index", { title: "Hello World!" });
});
module.exports = router;
