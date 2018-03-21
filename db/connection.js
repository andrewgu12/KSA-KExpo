"use strict";
var Pool = require("pg").Pool;
var keys = require("../config/info");
console.log(keys);
var pool = new Pool({
    user: keys.POSTGRES_USER,
    host: process.env.PGHOST || "localhost",
    database: keys.POSTGRES_DB,
    password: keys.POSTGRES_PASSWORD,
    port: 5432
});
module.exports = {
    query: function (text, params, callback) {
        console.log(pool);
        return pool.query(text, params, callback);
    }
};
