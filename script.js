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
  "INSERT INTO Visiters(Name,Age,Date_of_visit,Time_of_visit,Name_of_the_person_who_assisted_the_visitor,Comments)VALUES('Kenney',23,'23','14','Leon','I learnt a lot about uMuzi,thanks for the opportunity')",
  (err, res) => {
    console.log(err, res);
    pool.end();
  }
);

function list_all_visitor() {
  pool.query("SELECT * from Visiters", (err, res) => {
    console.log(err, res);
    pool.end();
  });
}

// add_New_visitor("Buhles", 19, "23", "12", "Nelly", "Thanks");
list_all_visitor();
