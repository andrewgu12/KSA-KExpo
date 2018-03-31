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
// get value of flag
router.get("/check-flag", function (req, res, next) {
    db.query("SELECT * FROM permissions WHERE name = $1 LIMIT 1", [req.query.id], function (err, flagValue) {
        if (err) {
            console.log(err);
            res.send({ code: 400, err: err });
        }
        else {
            console.log(flagValue);
            if (flagValue.rows) {
                res.send({ code: 200, value: flagValue.rows[0].enabled });
            }
            else {
                res.send({ code: 404, value: "not found" });
            }
        }
    });
});
router.post("/flip-flag", function (req, res, next) {
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
router.post("/insert", function (req, res, next) {
    db.query("INSERT INTO permissions(name, category, enabled) VALUES($1, $2, $3)", [req.body.name, "p", false], function (err, queryRes) {
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
