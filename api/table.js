const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./tasks.db', sqlite.OPEN_READWRITE, (err) => {
    if (err) return console.error(err);
});

const sql = `CREATE TABLE tasks(ID INTEGER PRIMARY KEY AUTOINCREMENT, text, day, reminder)`;
db.run(sql);
