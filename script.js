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

pool.query(
  "INSERT INTO Visiters(Name,Age,Date_of_visit,Time_of_visit,Name_of_the_person_who_assisted_the_visitor,Comments)VALUES('Buhle',24,'23:12:2019','12:07','Sindy','None')",
  (err, res) => {
    console.log(err, res);
    pool.end();
  }
);
