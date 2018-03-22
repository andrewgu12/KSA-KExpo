"use strict";
var express = require("express");
var db = require("../db/connection");
var router = express.Router();
router.get("/", function (req, res, next) {
    res.render("index", { title: "Control Panel | KSA KExpo" });
});
router.get("/enter", function (req, res, next) {
    res.render("index", { title: "Enter Competitors | KSA KExpo" });
});
module.exports = router;
