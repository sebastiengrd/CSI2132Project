const { Pool, Client } = require('pg')
    // https://node-postgres.com/api/client

const pool = new Pool({
    user: 'username',
    host: 'localhost',
    database: 'default_database',
    password: 'password',
    port: 5432,
})
pool.query('SELECT NOW()', (err, res) => {
    //console.log(err, res)
    pool.end()
})
const client = new Client({
    user: 'username',
    host: 'localhost',
    database: 'default_database',
    password: 'password',
    port: 5432,
})
client.connect()


client.query('SELECT * FROM student;', (err, res) => {
    console.log(res["rows"][0])
    client.end()
})