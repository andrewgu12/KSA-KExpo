"use strict";
/**
 * Results page - admin panel
 */
var express = require("express");
var router = express.Router();
router.get("/", function (req, res, next) {
    console.log("/results\n");
});
module.exports = router;
