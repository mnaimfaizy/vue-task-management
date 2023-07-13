const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const mysql = require('mysql');
// const sqlite = require('sqlite').verbose();
const url = require('url');

// const db = new sqlite.Database('./tasks.db', sqlite.OPEN_READWRITE, (err) => {
//     if (err) return console.error(err);
// });

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

// CORS is enabled for the selected origins
let corsOptions = {
    origin: [ 'https://vue-task-management.mnfprofile.com', 'http://localhost:3000' ]
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

//post request
app.post('/tasks', (req, res) => {
    try {
        const { text, day, reminder } = req.body;
        sql = "INSERT INTO tasks(text, day, reminder) VALUES(?,?,?)";
        db.query(sql, [text, day, reminder], (err) => {
            if (err) return res.json({status: 300, success: false,  error: err});

            console.log('successful input ', text, day, reminder);
        });
        res.json({
            status: 200,
            success: true
        })
    } catch (error) {
        return res.json({
            status: 400,
            success: false,
        })
    }
})

// get request
app.get("/tasks", (req, res) => {
    sql = "SELECT * FROM tasks";
    try {
        const queryObject = url.parse(req.url, true).query; // query parameters
        if(queryObject.field && queryObject.type) sql += ` WHERE ${queryObject.field} LIKE '%${queryObject.type}%'`;
        db.query(sql, (err, rows) => {
            if (err) return res.json({status: 300, success: false,  error: err});

            if(rows.length < 1) return res.json({ status: 300, success: false, error: "No Match"});

            return res.status(200).json({
                status: true,
                data: rows
            });
        })
    } catch (error) {
        return res.json({
            status: 400,
            success: false,
        })
    }
});

// Get single row by ID
app.get('/tasks/:id', (req, res) => {
    // Check if the id is not empty
    if (!req.params.id) {
        return res.json({ status: 300, success: false, message: "Id is not specified!"})
    }
    const id = parseInt(req.params.id)
    
    sql = `SELECT * FROM tasks WHERE ID=${id} LIMIT 1`;
    try {
        db.query(sql, (err, rows) => {
            if (err) return res.json({status: 300, success: false,  error: err});

            if(rows.length < 1) return res.json({ status: 300, success: false, error: "No Match"});

            return res.status(200).json({
                status: true,
                data: rows
            });
        })
    } catch (error) {
        return res.json({
            status: 400,
            success: false,
        })
    }
})

// DELETE Task
app.delete('/tasks/:taskId', (req, res) => {
    const taskId = parseInt(req.params.taskId);

    sql = `DELETE FROM tasks WHERE ID=${taskId}`;

    db.query(sql, (err) => {
        if (err) return res.json({status: 300, success: false,  error: err});

        console.log(`Task with ID=${taskId} has been deleted successfully`);
    })
    res.json({
        status: 200,
        success: true
    })
})

// UPDATE Task's reminder
app.put('/tasks/:id', (req, res) => {
    const { text, day, reminder } = req.body
    const taskId = req.params.id
    sql = "UPDATE tasks SET text=?, day=?, reminder=? WHERE ID=?";

    try {
        db.query(sql, [text, day, reminder, taskId], (err) => {
            if (err) return res.json({status: 300, success: false,  error: err});

            console.log(`Task with ID=${taskId} has been updated successfully`);
        });
        return res.json({
            status: 200,
            success: true,
            data: req.body
        });
    } catch (error) {
        return res.json({
            status: 400,
            success: false,
        })
    }
});

app.listen(process.env.PORT || 3000);