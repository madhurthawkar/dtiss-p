const express = require('express')
const cryptoJs = require('crypto-js')
const jwt = require('jsonwebtoken')

const pool = require('../db/db')
const result = require('../utils/result')
const config = require('../utils/config') 

const router = express.Router()

router.post('/register', (req, res) => {
    const { firstName, lastName, email, phone, dob, password} = req.body
    const encryptPassword = String(cryptoJs.SHA256(password))
    const sql = `INSERT INTO users(first_name, last_name, email, mobile, birth, password) VALUES(?,?,?,?,?,?)`
    pool.query(sql,
        [firstName, lastName, email, phone, dob, encryptPassword],
        (error, data) => {
            res.send(result.createResult(error, data))
        }
    )
})

router.post('/login', (req, res) => {
  const { email, password } = req.body
  const encryptedPassword = String(cryptoJs.SHA256(password))
  const sql = `SELECT * FROM users WHERE email = ? AND password = ?`
  pool.query(sql, [email, encryptedPassword], (error, data) => {
    if (data) {
      if (data.length != 0) {
        const payload = {
          userId: data[0].id,
        }
        const token = jwt.sign(payload, config.secret)
        const body = {
          token: token,
          userId : data[0].id,
          firstName: data[0].first_name,
          lastName: data[0].last_name,
        }
        res.send(result.createSuccessResult(body))
      } else res.send(result.createErrorResult('Invalid email or password'))
    } else res.send(result.createErrorResult(error))
  })
})

router.get('/all', (req, res) => {
  const userId = req.query.userId   // logged-in user

  const sql = `
    SELECT id, first_name, last_name, email
    FROM users
    WHERE id != ?
  `

  pool.query(sql, [userId], (err, data) => {
    res.send(result.createResult(err, data))
  })
})
router.get('/profile', (req, res) => {
  const userId = req.query.userId

  const sql = `
    SELECT
    first_name,
    last_name,
    email,
    mobile,
    DATE_FORMAT(birth, '%Y-%m-%d') AS birth
    FROM users
    WHERE id = ?

  `

  pool.query(sql, [userId], (err, data) => {
    res.send(result.createResult(err, data))
  })
})
router.put('/profile', (req, res) => {
  const { userId, firstName, lastName, email, mobile, birth } = req.body

  const sql = `
    UPDATE users
    SET first_name = ?, last_name = ?, email = ?, mobile = ?, birth = ?
    WHERE id = ?
  `

  pool.query(
    sql,
    [firstName, lastName, email, mobile, birth, userId],
    (err, data) => {
      if (data.affectedRows === 0) {
        res.send(result.createResult('User not found', null))
      } else {
        res.send(result.createResult(null, data))
      }
    }
  )
})

router.put('/change-password', (req, res) => {
  const { userId, currentPassword, newPassword } = req.body

  const encryptedCurrent = String(cryptoJs.SHA256(currentPassword))
  const encryptedNew = String(cryptoJs.SHA256(newPassword))

  // 1️⃣ Verify current password
  const checkSql = `
    SELECT id FROM users
    WHERE id = ? AND password = ?
  `

  pool.query(checkSql, [userId, encryptedCurrent], (err, data) => {
    if (err) {
      return res.send(result.createResult(err, null))
    }

    if (data.length === 0) {
      return res.send(result.createResult('Current password is incorrect', null))
    }

    // 2️⃣ Update to new password
    const updateSql = `
      UPDATE users SET password = ?
      WHERE id = ?
    `

    pool.query(updateSql, [encryptedNew, userId], (err2, data2) => {
      if (err2) {
        res.send(result.createResult(err2, null))
      } else {
        res.send(result.createResult(null, 'Password updated successfully'))
      }
    })
  })
})


module.exports = router