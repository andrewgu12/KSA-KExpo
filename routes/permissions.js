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
router.post("/flip-flag", function (req, res, next) {
    console.log(req.body);
    db.query("UPDATE permissions SET enabled = $1 WHERE name = $2", [req.body.value, req.body.name], function (err, queryRes) {
        if (err) {
            console.log(err);
            res.send({ code: 400, err: err });
        }
        else {
            res.send({ code: 200, query: queryRes });
        }
    });
});
module.exports = router;
