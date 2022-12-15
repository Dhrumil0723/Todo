const express = require("express");
const app = express();
const bodyParse = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

const db = mysql.createPool({
    host: "172.0.0.1",
    user: "root",
    password: "",
    database: "todo"
});

app.use(cors());
app.use(express.json());
app.use(bodyParse.urlencoded({extended: true}));

app.get("/api/get", (req, res) => {
    const sqlGet = "SELECT * FROM list";
    db.query(sqlGet, (error, result) => {
        res.send(result);
    });
});

app.post("/api/post", (req, res) => {
    const {name} = req.body;
    const sqlInsert = "INSERT INTO list (name) VALUES(?)";
    db.query(sqlInsert ,[name], (error, result) => {
        if(error) {
            console.log(error);
        }
    });
});

app.delete("/api/remove/:id", (req, res) => {
    const {id} = req.params;
    const sqlRemove = "DELETE FROM list WHERE id = ?";
    db.query(sqlRemove , id, (error, result) => {
        if(error) {
            console.log(error);
        }
    });
});

app.get("/api/get/:id", (req, res) => {
    const {id} = req.params;
    const sqlGet = "SELECT * FROM list where id = ?";
    db.query(sqlGet, id, (error, result) => {
        if(error) {
            console.log(error);
        }
        res.send(result);
    });
});

app.put("/api/update/:id", (req, res) => {
    const {id} = req.params;
    const {name} = req.body;
    const sqlUpdate = "UPDATE list SET name = ? where id = ?";
    db.query(sqlUpdate, [name, id], (error, result) => {
        if(error) {
            console.log(error);
        }
        res.send(result);
    });
});

app.get("/", (req, res) => {
    // const sqlInsert = "INSERT INTO list VALUES('1','milk');";
    // db.query(sqlInsert, (error, result) => {
    //     console.log("error", error);
    //     console.log("result", result);
    //     res.send("Hello Express");
    // })
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
})