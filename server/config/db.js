const { Pool } = require("pg");
const pool = new Pool({
  user: "webgl",
  host: "1.223.174.165",
  database: "postgres",
  password: "mes1234!",
  port: 4569,
});

module.exports = pool;
