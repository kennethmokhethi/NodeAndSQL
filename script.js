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

function create_table_visiter() {
  pool.query(
    "CREATE TABLE Visiters(id SERIAL PRIMARY KEY,Name VARCHAR(50) NOT NULL,Age BIGINT NOT NULL,Date_of_visit DATE NOT NULL,Time_of_visit VARCHAR(50) NOT NULL,Name_of_the_person_who_assisted_the_visitor VARCHAR(50) NOT NULL,Comments VARCHAR(100) NOT NULL)",
    (err, res) => {
      console.log(err, res);
      pool.end();
    }
  );
}

function add_New_visitor(
  argName,
  argAge,
  argDate_of_visit,
  argTime_of_visit,
  argName_of_person_who_assisted_the_visitor,
  argComments
) {
  const text =
    "INSERT INTO Visiters(Name,Age,Date_of_visit,Time_of_visit,Name_of_the_person_who_assisted_the_visitor,Comments) VALUES($1,$2,$3,$4,$5,$6) RETURNING *";
  const values = [
    `${argName}`,
    `${argAge}`,
    `${argDate_of_visit}`,
    `${argTime_of_visit}`,
    `${argName_of_person_who_assisted_the_visitor}`,
    `${argComments}`
  ];

  pool.query(text, values, (err, res) => {
    if (err) {
      console.log(err.stack);
    } else {
      console.log(res.rows[0]);
    }
  });

  pool.end();
}

function list_all_visitor() {
  pool.query("SELECT * from Visiters", (err, res) => {
    console.log(err, res);
    pool.end();
  });
}

// create_table_visiter();
// add_New_visitor("Buhle", 19, "12/12/2019", "12:06:02", "Nelly", "Thanks");
list_all_visitor();
