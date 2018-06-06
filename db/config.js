"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const env = require("env-var");
const pool = new pg_1.Pool({
    user: env.get('POSTGRES_USER').required(),
    host: env.get('HOST') || 'localhost',
    database: env.get('POSTGRES_DB').required(),
    password: env.get('POSTGRES_PASSWORD').required(),
    port: env.get('POSTGRES_PORT').asIntPositive() || 5432
});
exports.query = (text, params, callback) => {
    return pool.query(text, params, callback);
};
