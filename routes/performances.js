"use strict";
var express = require("express");
var router = express.Router();
var db = require("../db/connection");
var perSort = function (a, b) {
    if (a.id < b.id)
        return -1;
    if (a.id > b.id)
        return 1;
    return 0;
};
router.get("/", function (req, res, next) {
    db.query("SELECT * FROM performance", function (err, queryRes) {
        if (err) {
            res.send({ code: 400, err: err });
        }
        else {
            var sortedPerformances = queryRes.rows;
            sortedPerformances.sort(perSort);
            res.send({ code: 200, response: sortedPerformances });
        }
    });
});
router.post("/enter", function (req, res, next) {
    db.query("INSERT INTO performance(name, approval, enabled) VALUES($1, $2, $3)", [req.body.name, 0, false], function (err, queryRes) {
        if (err) {
            console.log(err);
            res.send({ code: 400, err: err });
        }
        else {
            res.send({ code: 200, query: queryRes.rows });
        }
    });
});
router["delete"]("/delete", function (req, res, next) {
    db.query("DELETE FROM performance WHERE id=$1", [parseInt(req.query.id)], function (err, queryRes) {
        if (err) {
            console.log(err);
            res.send({ code: 400, err: err });
        }
        else {
            res.send({ code: 200, query: queryRes });
        }
    });
});
router.post("/update", function (req, res, next) {
    db.query("UPDATE performance SET enabled = $1 WHERE id = $2", [req.body.enabled, req.body.id], function (err, queryRes) {
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
