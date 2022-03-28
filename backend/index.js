const { Pool, Client } = require('pg')
const express = require('express')
const app = express()
const port = 8080

const { handleBasicQueryResponse } = require('./helper')

const client = new Client({
    user: 'username',
    host: 'database',
    database: 'default_database',
    password: 'password',
    port: 5432,
})

app.use(express.json()) // for parsing application/json


app.get('/user', (req, httpRes) => {

    client.query('SELECT * FROM IUser;', (err, res) => { handleBasicQueryResponse(httpRes, err, res) })
})

app.get('/user/:username', (req, httpRes) => {
    client.query(`SELECT * FROM IUser WHERE username = $1;`, [req.params.username], (err, res) => { handleBasicQueryResponse(httpRes, err, res) })
})

app.post('/user/', (req, httpRes) => {
    payload = req.body
    client.query(`INSERT INTO IUser VALUES ($1, $2, $3);`, [payload.username, payload.email, payload.dob], (err, res) => { handleBasicQueryResponse(httpRes, err, res) })
})

app.get('/person', (req, httpRes) => {

    client.query('SELECT * FROM Person;', (err, res) => { handleBasicQueryResponse(httpRes, err, res) })
})

app.get('/person/:ssn', (req, httpRes) => {
    client.query(`SELECT * FROM Person WHERE ssn = $1;`, [req.params.ssn], (err, res) => { handleBasicQueryResponse(httpRes, err, res) })
})

app.post('/person/', (req, httpRes) => {
    payload = req.body
    client.query(`INSERT INTO Person VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`, [payload.ssn, payload.username, payload.firstName, payload.middleName, payload.lastName, payload.gender, payload.dob, payload.email, payload.phoneNumber], (err, res) => { handleBasicQueryResponse(httpRes, err, res) })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
    client.connect();
})