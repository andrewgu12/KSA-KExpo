"use strict";
var express = require("express");
var router = express.Router();
var db = require("../db/connection");
router.get("/", function (req, res, next) {
    db.query("SELECT * FROM performance", function (err, res) {
        if (err) {
            res.send({ code: 400, err: err });
        }
        else {
            res.send({ code: 200, res: res });
        }
    });
});
module.exports = router;
