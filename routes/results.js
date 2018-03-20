"use strict";
/**
 * Results page - admin panel
 */
var express = require("express");
var db = require("../db/connection");
var router = express.Router();
router.get("/", function (req, res, next) {
    console.log("/results\n");
});
module.exports = router;
