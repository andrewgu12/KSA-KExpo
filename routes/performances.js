"use strict";
var express = require("express");
var router = express.Router();
var db = require("../db/connection");
router.get("/", function (req, res, next) {
    console.log("make query");
    db.query("SELECT * FROM performance", function (err, queryRes) {
        console.log("finished query");
        if (err) {
            res.send({ code: 400, err: err });
        }
        else {
            res.send({ code: 200, query: queryRes });
        }
    });
});
router.post("/enter", function (req, res, next) {
});
module.exports = router;
