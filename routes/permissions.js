"use strict";
var express = require("express");
var router = express.Router();
var db = require("../db/connection");
router.get("/performances", function (req, res, next) {
    db.query("SELECT * FROM permissions WHERE category = $1", ["p"], function (err, perfRes) {
        if (err) {
            res.send({ code: 400, err: err });
        }
        else {
            res.send({ code: 200, response: perfRes.rows });
        }
    });
});
module.exports = router;
