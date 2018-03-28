"use strict";
var express = require("express");
var db = require("../db/connection");
var router = express.Router();
router.get("/", function (req, res, next) {
    res.send({ code: 200 });
});
router.get("/subtractOne", function (req, res, next) {
});
module.exports = router;
