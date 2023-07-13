// const sqlite = require('sqlite3').verbose();
// const db = new sqlite.Database('./tasks.db', sqlite.OPEN_READWRITE, (err) => {
//     if (err) return console.error(err);
// });
// const sql = `CREATE TABLE tasks(ID INTEGER PRIMARY KEY AUTOINCREMENT, text, day, reminder)`;
// db.run(sql);

const mysql = require('mysql');

var db = mysql.createConnection({
    host: "localhost",
    database: "khudqyeg_vue_task_management",
    user: "khudqyeg_vue_task_management",
    password: "Kabul@123"
});

db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});
