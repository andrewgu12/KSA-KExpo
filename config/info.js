let keys = {};

if (process.env.NODE_ENV == 'production') {
  keys["POSTGRES_DB"] = process.env.POSTGRES_DB;
  keys["POSTGRES_USER"] = process.env.POSTGRES_USER;
  keys["POSTGRES_PASSWORD"] = process.env.POSTGRES_PASSWORD;
} else {
  keys = require("./keys.json");
  console.log(keys);
}

module.exports = keys;