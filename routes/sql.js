const express = require('express')
const router = express.Router()
var mysql = require('mysql')





const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: "",
    database : "nodeTraining"
})

db.connect(err => {
    if (err){
        throw err
    }
    console.log("MYSQL CONNECTED SUCCESFULLY!")
})


router.get('/createbd',(req,res) => {
    var sql = 'CREATE DATABASE nodeTraining'
    db.query(sql, err => {
        if (err){
            throw err
        }
        console.log("Database created!")
        res.send("Database created!")
    })
    
})

router.get('/createEmployeeTable', (req,res) => {
    var sql = "CREATE TABLE employee(id int AUTO_INCREMENT, name VARCHAR(200), designation VARCHAR(200), PRIMARY KEY(id))"
    db.query(sql, err => {
        if (err){
            throw err
        }
        res.send("Table created!")
    })
})

router.get('/insert', (req,res) => {
    var person = {
        name : "Sabhari",
        designation : "Software Engineer"
    }
    var sql = "INSERT INTO employee SET ?"
    db.query(sql,person, err=>{
        if (err){
            throw err
        }
        res.send("Record inserted")
    })
})

router.get('/read',(req,res) => {
    let sql = "SELECT * FROM employee"
    let query = db.query(sql, (err,response) => {
        if (err) {
            throw err
        }
        
        console.log(response)
        res.send("success")
        console.log("========================")
    })
})

router.get("/update/:id", (req,res) => {
    const id = req.params.id
    let sql = "UPDATE employee SET designation = 'ASSOCIATE MANAGER' WHERE id = " + id
    db.query(sql, (err,result) => {
        if(err){
            throw err
        }
        console.log(result)
        res.send("UPDATED!")
    })
})

router.get("/delete/:id", (req,res) => {
    const id = req.params.id
    let sql = "DELETE FROM employee WHERE id = " + id
    db.query(sql, (err,result) => {
        if (err){
            throw err
        }
        console.log(result)
        res.send("DELETED")
    })
})

module.exports = router