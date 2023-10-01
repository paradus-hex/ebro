const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('../dataBase.db');
// create a table and insert a row
// db.serialize(() => {
//   db.run("CREATE TABLE Users (name, lastName)");
//   db.run("INSERT INTO Users VALUES (?, ?)", ['foo', 'bar']);
// });