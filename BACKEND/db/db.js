const mysql = require('mysql2')

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '7532',
    database: 'movies'
})

module.exports = pool