const express = require('express')
const pool = require('../db/db')
const result = require('../utils/result')

const router = express.Router()

router.get('/all',(req, res) => {
    const sql = `SELECT * FROM  movies`
    pool.query(sql, (err, data) => {
        res.send(result.createResult(err, data))
    })
})

router.get('/:id', (req, res) => {
    const { id } = req.params 
    const sql = `SELECT * FROM  movies WHERE id = ?`
    pool.query(sql, [id], (err, data) => {
        res.send(result.createResult(err, data))
    })
})
module.exports = router