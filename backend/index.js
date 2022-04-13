const { Pool, Client } = require('pg')
const express = require('express')
const cors = require('cors')
const app = express()
const port = 8080
const { v1 } = require("uuid");

const { handleBasicQueryResponse } = require('./helper')

const client = new Client({
    user: 'username',
    host: 'database',
    database: 'default_database',
    password: 'password',
    port: 5432,
})

app.use(express.json()) // for parsing application/json
app.use(cors({
    origin: '*',
}))

app.get('/user', (req, httpRes) => {

    client.query('SELECT * FROM IUser;', (err, res) => { handleBasicQueryResponse(httpRes, err, res) })
})

app.get('/user/:username', (req, httpRes) => {
    client.query(`SELECT * FROM IUser WHERE username = $1;`, [req.params.username], (err, res) => { handleBasicQueryResponse(httpRes, err, res) })
})

app.post('/user/', (req, httpRes) => {
    payload = req.body
    client.query(`INSERT INTO IUser VALUES ($1, $2, $3);`, [payload.username, payload.email, payload.dateofbirth], (err, res) => { handleBasicQueryResponse(httpRes, err, res) })
})

app.get('/person', (req, httpRes) => {

    client.query('SELECT * FROM Person;', (err, res) => { handleBasicQueryResponse(httpRes, err, res) })
})

app.get('/person/:ssn', (req, httpRes) => {
    client.query(`SELECT * FROM Person WHERE ssn = $1;`, [req.params.ssn], (err, res) => { handleBasicQueryResponse(httpRes, err, res) })
})

app.post('/person/', (req, httpRes) => {
    payload = req.body
    client.query(`INSERT INTO Person VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`, [payload.ssn, payload.username, payload.firstname, payload.middlename, payload.lastname, payload.gender, payload.dateofbirth, payload.email, payload.phonenumber], (err, res) => { handleBasicQueryResponse(httpRes, err, res) })
})

/* 
    select all the appointments of a person (seb)
*/
app.get('/person/:patientid/appointments', (req, httpRes) => {
    client.query(`SELECT appointid, patientid, Employee.employeeid, date, starttime, endtime, appointtype, status, room, invoiceid, emprole, branchid, firstname, middlename, lastname, phonenumber FROM (Appointment JOIN Employee on Appointment.employeeid = Employee.employeeid) JOIN Person on employee.ssn = Person.ssn WHERE patientid = $1;`, [req.params.patientid], (err, res) => { handleBasicQueryResponse(httpRes, err, res) })
})

/* 
    select all the appointments of a doctor (seb)
*/
app.get('/doctor/:employeeid/appointments', (req, httpRes) => {
    client.query(`SELECT appointid, Appointment.patientid,  date, starttime, endtime, appointtype, status, room, invoiceid, balance, firstname, middlename, lastname, gender, dateofbirth, email, phonenumber FROM (Appointment JOIN Patient on Appointment.patientId = Patient.patientId) JOIN Person on Patient.ssn = Person.ssn  WHERE employeeid = $1;`, [req.params.employeeid], (err, res) => { handleBasicQueryResponse(httpRes, err, res) })
})

/* 
    Retrieve all procedures associated to an appointment (seb)
*/
app.get('/appointment/:appointId/procedures', (req, httpRes) => {
    client.query(`SELECT * FROM appointmentprocedure WHERE appointId = $1;`, [req.params.appointId], (err, res) => { handleBasicQueryResponse(httpRes, err, res) })
})


/**
 * Retrieving list of dentists in a branch (loic)
 */
app.get('/branch/:branchId/employee', (req, httpRes) => {
    client.query(`SELECT * FROM Employee JOIN Person ON Employee.ssn = Person.ssn WHERE Employee.branchId = $1;`, [req.params.branchId], (err, res) => { handleBasicQueryResponse(httpRes, err, res) })
})

/**
 * Add an appointment (For receptionist/admin) (loic)
 */
app.post('/appointments/', (req, httpRes) => {
    payload = req.body
    appointmentId = Date.now() % 2147483647;
    client.query(`INSERT INTO Appointment VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`, [appointmentId, payload.patientid, payload.employeeid, payload.date, payload.starttime, payload.endtime, payload.appointtype, payload.status, payload.room, payload.invoiceid], (err, res) => { handleBasicQueryResponse(httpRes, err, res) })
})

/**
 * Add an appointment (For receptionist/admin) (loic)
 */
app.get('/appointments/', (req, httpRes) => {
    payload = req.body
    client.query(`SELECT * from Appointment;`, [], (err, res) => { handleBasicQueryResponse(httpRes, err, res) })
})

/**
 * Retrieving all treatments associated to an appointment (hened)
 */
app.get('/appointment/:appointId/treatment', (req, httpRes) => {
    client.query('SELECT * FROM Treatment WHERE appointId = $1;', [req.params.appointId], (err, res) => { handleBasicQueryResponse(httpRes, err, res) })
})


/**
 * Retrieving all treatments associated to an appointment (hened)
 */
app.get('/physicians/', (req, httpRes) => {
    client.query("SELECT employeeid, Person.ssn, salary, emprole, emptype, branchid, username, firstname, middlename, lastname, gender, dateofbirth, email, phonenumber FROM Employee JOIN Person ON  Employee.ssn = Person.ssn WHERE empRole = 'Dentist' OR empRole = 'Hygienist';", [], (err, res) => { handleBasicQueryResponse(httpRes, err, res) })
})

app.get('/patient/', (req, httpRes) => {
    payload = req.body
    client.query('SELECT patientid, Person.ssn, balance, username, firstname, middlename, lastname, gender, dateofbirth, email, phonenumber FROM Patient JOIN Person ON Patient.ssn = Person.ssn;', [], (err, res) => { handleBasicQueryResponse(httpRes, err, res) })
})


/**
 * Add new patient (hened)
 */
app.post('/patient/', (req, httpRes) => {
    payload = req.body
    client.query('INSERT INTO Patient VALUES ($1, $2, $3);', [payload.patientid, payload.ssn, payload.balance], (err, res) => { handleBasicQueryResponse(httpRes, err, res) })
})

/**
 * update the field of a patient. Can either be the patient or the person
 */
app.post('/patient/update_field', (req, httpRes) => {
    payload = req.body
    if (["ssn", "username", "firstname", "middlename", "lastname", "gender", "dateofbirth", "email", "phonenumber"].includes(payload.field)) {
        client.query(`UPDATE Person SET ` + payload.field + ` = $1 WHERE ssn = $2;`, [payload.value, payload.ssn], (err, res) => { handleBasicQueryResponse(httpRes, err, res) })
    } else if (["patientid", "ssn", "balance"]) {
        client.query(`UPDATE Patient SET ` + payload.field + ` = $1 WHERE ssn = $2;`, [payload.value, payload.ssn], (err, res) => { handleBasicQueryResponse(httpRes, err, res) })
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
    client.connect();
})