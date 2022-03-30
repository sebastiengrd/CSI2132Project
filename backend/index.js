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
app.get('/appointment/:appointmentid/procedures', (req, httpRes) => {
    client.query(`SELECT * FROM appointmentprocedure WHERE appointmentid = $1;`, [req.params.appointmentid], (err, res) => { handleBasicQueryResponse(httpRes, err, res) })
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
    client.query(`INSERT INTO Appointment VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`, [payload.appointmentID, payload.patientID, payload.EmployeeID, payload.date, payload.startTime, payload.endTime, payload.appointmentType, payload.status, payload.room, payload.invoiceID], (err, res) => { handleBasicQueryResponse(httpRes, err, res) })
})


/**
 * Retrieving all treatments associated to an appointment (hened)
 */
app.get('/appointment/:appointId/treatment', (req, httpRes) => {
    client.query('SELECT * FROM Treatment WHERE appointId = $1;', [req.params.appointId], (err, res) => { handleBasicQueryResponse(httpRes, err, res) })
})

/**
 * Add new patient (hened)
 */
app.post('/patient/', (req, httpRes) => {
    payload = req.body
    client.query('INSERT INTO Patient VALUES ($1, $2, $3);', [payload.patientId, payload.ssn, payload.balance], (err, res) => { handleBasicQueryResponse(httpRes, err, res) })
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
    client.connect();
})