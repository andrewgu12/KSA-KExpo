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
    db.query("INSERT INTO performance(name, approval) VALUES($1, $2)", [req.body.name, 0], function (err, queryRes) {
        if (err) {
            console.log(err);
            res.send({ code: 400, err: err });
        }
        else {
            db.query("INSERT INTO permissions(name, category, enabled) VALUES($1, $2, $3)", [req.body.name, "p", false], function (err, permRes) {
                if (err) {
                    res.send({ code: 400, err: err });
                }
                else {
                    res.send({ code: 200, query: queryRes.rows });
                }
            });
        }
    });
});
router.post("/enter-multiple", function (req, res, next) {
    var performances = req.body.performances;
    // this is only used for final calculation, so ok to just insert 0 for values
    performances.forEach(function (perf) {
        db.query("INSERT INTO finalperformance(name, approval) VALUES($1, $2)", [perf.name, 0], function (err, queryRes) {
            if (err) {
                console.log(err);
                res.send({ code: 400, err: err });
            }
            else {
                console.log("success!");
            }
        });
    });
    res.send({ code: 200, res: "success!" });
});
router.get("/get-final", function (req, res, next) {
    console.log("Get final");
    db.query("SELECT * FROM finalperformance LIMIT 3", function (err, queryRes) {
        if (err) {
            res.send({ code: 400, err: err });
        }
        else {
            var sortedPerformances = queryRes.rows;
            res.send({ code: 200, response: sortedPerformances });
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
    db.query("UPDATE permissions SET enabled = $1 WHERE name = $2", [req.body.enabled, req.body.name], function (err, queryRes) {
        if (err) {
            console.log(err);
            res.send({ code: 400, err: err });
        }
        else {
            res.send({ code: 200, query: queryRes });
        }
    });
});
router.post("/vote", function (req, res, next) {
    var direction = (req.body.direction === "increment") ? 1 : -1;
    db.query("UPDATE performance SET approval = approval + $1 WHERE name = $2", [direction, req.body.name], function (err, queryRes) {
        if (err) {
            res.send({ code: 400, err: err });
        }
        else {
            res.send({ code: 200, message: "success!" });
        }
    });
});
module.exports = router;
