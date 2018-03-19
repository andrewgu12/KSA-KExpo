"use strict";
/*
 * Votes page - for audience members
 */
var express = require("express");
var router = express.Router();
router.get("/", function (req, res, next) {
    console.log("/votes\n");
});
module.exports = router;
