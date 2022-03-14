const { Pool, Client } = require('pg')
const express = require('express')
const app = express()
const port = 3000

const client = new Client({
    user: 'username',
    host: 'database',
    database: 'default_database',
    password: 'password',
    port: 5432,
})

app.get('/student', (req, httpRes) => {
    client.query('SELECT * FROM student;', (err, res) => {
        console.log(res["rows"]);
        httpRes.send(res["rows"])
    })
})

app.get('/student/:id', (req, httpRes) => {
    client.query(`SELECT * FROM student WHERE student_id = ${req.params.id};`, (err, res) => {
        console.log(res["rows"]);
        httpRes.send(res["rows"])
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
    client.connect();
})