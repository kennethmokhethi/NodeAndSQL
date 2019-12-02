const { Pool, Client } = require("pg");
const pool = new Pool({
  user: "user",
  host: "localhost",
  database: "umuzi",
  password: "passUmuzi",
  port: 5432
});

pool.connect(function(err) {
  if (err) console.log(err + "   Ooops iyala kuvuka iserver ndoda");
  else console.log("Connected!");
});

pool.query("SELECT * FROM Visiters", (err, res) => {
  console.log(err, res);
  pool.end();
});
