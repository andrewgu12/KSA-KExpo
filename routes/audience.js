"use strict";
var express = require("express");
var db = require("../db/connection");
var router = express.Router();
router.get("/", function (req, res, next) {
    db.query("SELECT * FROM member", function (err, queryRes) {
        if (err) {
            res.send({ code: 400, err: err });
        }
        else {
            console.log(queryRes.rows);
            res.send({ code: 200, response: queryRes.rows });
        }
    });
});
module.exports = router;
