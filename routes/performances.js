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
            res.send({ code: 200, response: queryRes.rows });
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
            console.log(queryRes);
            res.send({ code: 200, query: queryRes.rows });
        }
    });
});
router["delete"]("/delete", function (req, res, next) {
    // console.log(req);
    console.log(typeof req.query.id);
    db.query("DELETE FROM performance WHERE id=$1", [parseInt(req.query.id)], function (err, queryRes) {
        console.log("finished delete");
        if (err) {
            console.log(err);
            res.send({ code: 400, err: err });
        }
        else {
            console.log(queryRes);
            res.send({ code: 200, query: queryRes });
        }
    });
});
module.exports = router;
