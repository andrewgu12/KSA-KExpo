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
            res.send({ code: 200, response: queryRes.rows });
        }
    });
});
router.get("/user-info", function (req, res, next) {
    db.query("SELECT * FROM member WHERE username = $1 LIMIT 1", [req.query.username], function (err, queryRes) {
        if (err) {
            res.send({ code: 400, err: err });
        }
        else if (queryRes.rows.length == 0) {
            res.send({ code: 404, err: "Empty!" });
        }
        else {
            res.send({ code: 200, response: queryRes.rows[0] });
        }
    });
});
router.post("/enter", function (req, res, next) {
    db.query("INSERT INTO member(admin, username, performances) VALUES($1, $2, $3)", [false, req.body.username, "{}"], function (err, queryRes) {
        if (err) {
            res.send({ code: 400, err: err });
        }
        else {
            res.send({ code: 200, response: queryRes.rows });
        }
    });
});
module.exports = router;
