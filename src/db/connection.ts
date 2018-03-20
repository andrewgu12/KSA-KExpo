const { Pool } = require("pg");

const pool = new Pool();

export = {
  query: (text: String, params: Object, callback: Function) => {
    return pool.query(text, params, callback);
  }
};
