"use strict";
var Pool = require("pg").Pool;
var pool = new Pool();
module.exports = {
    query: function (text, params, callback) {
        return pool.query(text, params, callback);
    }
};
