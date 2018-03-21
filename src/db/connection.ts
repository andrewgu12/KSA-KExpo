const { Pool } = require("pg");
const keys = require("../config/info");

console.log(keys);
const pool = new Pool({
  user: keys.POSTGRES_USER,
  host: process.env.PGHOST || "localhost",
  database: keys.POSTGRES_DB,
  password: keys.POSTGRES_PASSWORD,
  port: 5432
});

export = {
  query: (text: String, params: Object, callback: Function) => {
    console.log(pool);
    return pool.query(text, params, callback);
  }
};
