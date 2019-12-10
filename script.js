//Distructing the pg object
const { Pool } = require("pg");
//Instatiating the pool object with credetials that will give access to the database
const pool = new Pool({
  user: "user",
  host: "localhost",
  database: "umuzi",
  password: "passUmuzi",
  port: 5432
});

//Checking for connection
pool.connect(function(err) {
  if (err) console.log("SOMETHING WENT WRONG: " + err);
  else console.log("Connected!");
});

//Creating a table called visiters
const create_visiters_table = () => {
  pool.query(
    "CREATE TABLE Visiters(id SERIAL PRIMARY KEY,Name VARCHAR(50) NOT NULL,Age BIGINT NOT NULL,Date_of_visit DATE NOT NULL,Time_of_visit VARCHAR(50) NOT NULL,Name_of_the_person_who_assisted_the_visitor VARCHAR(50) NOT NULL,Comments VARCHAR(100) NOT NULL)",
    (err, res) => {
      console.log(err, res);
      pool.end();
    }
  );
};

//Adding a new visiter into the table called visiters
const add_new_visiter = (
  argName,
  argAge,
  argDate_of_visit,
  argTime_of_visit,
  argName_of_person_who_assisted_the_visitor,
  argComments
) => {
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
};

//Querying all visiters
const list_all_visiters = () => {
  pool.query("SELECT * from Visiters", (err, res) => {
    console.log(err, res);
    pool.end();
  });
};

const delete_a_visiter = Id => {
  pool.query(`DELETE FROM Visiters WHERE id=${Id}`, (err, res) => {
    console.log(err, res);
    pool.end();
  });
};

const update_a_visiter = (column_name, column_value, visiter_id) => {
  pool.query(
    `UPDATE Visiters SET ${column_name} =${column_value} WHERE id=${visiter_id}`,
    (err, res) => {
      console.log(err, res);
      pool.end();
    }
  );
};

const view_one_visiter = Id => {
  pool.query(`SELECT * FROM Visiters WHERE id=${Id}`, (err, res) => {
    console.log(err, res);
    pool.end();
  });
};
// create_visiters_table();
// add_new_visiter(
//   "Buhle D",
//   23,
//   "12/12/2019",
//   "14:06:02",
//   "Nelly and Menxi",
//   "Thanks"
// );
// add_new_visiter(
//   "Kenneth Mckay",
//   26,
//   "07/24/2019",
//   "09:36:45",
//   "Sipho Mkhwanazi",
//   "I enjoyed my visit at Umuzi"
// );
// list_all_visiters();
// delete_a_visiter(1);
view_one_visiter(2);
