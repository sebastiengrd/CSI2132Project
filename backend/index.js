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

function handleBasicQueryResponse(httpResponse, err, res) {
    if (err) {
        console.log("ERROR");
        console.log(err);
        httpResponse.status(400).send("Invalid Request");
        return;
    }
    console.log(res["rows"])
    httpResponse.send(res["rows"]);
}

app.get('/student', (req, httpRes) => {

    client.query('SELECT * FROM student;', (err, res) => { handleBasicQueryResponse(httpRes, err, res) })
})

app.get('/student/:id', (req, httpRes) => {
    client.query(`SELECT * FROM student WHERE student_id = $1;`, [req.params.id], (err, res) => { handleBasicQueryResponse(httpRes, err, res) })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
    client.connect();
})