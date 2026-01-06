const express = require('express')
const pool = require('../db/db')
const result = require('../utils/result')

const router = express.Router()

router.post('/add', (req, res) => {
    const {movieId, review, rating, userId } = req.body

    const sql = `INSERT INTO reviews (movie_id, review, rating, user_id, modified) VALUES (?, ?, ?, ?, NOW())`

    pool.query(sql, [movieId, review, rating, userId], ((err, data) => {
        res.send(result.createResult(err, data))
    }))
})
// router.get(`/all`, (req,res) => {
//     const sql = `SELECT
//   r.id,
//   r.review,
//   r.rating,
//   r.modified,
//   m.title,
//   u.first_name,
//   u.last_name
// FROM reviews r
// JOIN movies m ON r.movie_id = m.id
// JOIN users u ON r.user_id = u.id;
// `
//     pool.query(sql, (err, data) => {
//     res.send(result.createResult(err, data))
//   })
// })

router.get('/all', (req, res) => {
  const sql = `
    SELECT
      r.id,
      r.review,
      r.rating,
      r.modified,
      m.title,
      u.first_name,
      u.last_name
    FROM reviews r
    JOIN movies m ON r.movie_id = m.id
    JOIN users u ON r.user_id = u.id
    ORDER BY r.modified DESC
  `

  pool.query(sql, (err, data) => {
    if (err) {
      console.error(err)
      return res.status(500).json({ error: err.message })
    }
    res.json(data)  
  })
})

router.get(`/my`, (req, res) => {
    const userId = req.query.userId
    const sql = `SELECT
      r.id,
      r.review,
      r.rating,
      r.modified,
      m.title
    FROM reviews r
    JOIN movies m ON r.movie_id = m.id
    WHERE r.user_id = ?
    ORDER BY r.modified DESC`
    pool.query(sql, [userId], ((err, data) => {
        res.send(result.createResult(err, data))
    }))
})

router.delete('/:id', (req, res) => {
    const reviewId = req.params.id
    const userId = req.query.userId
    const sql = `DELETE FROM reviews WHERE id = ? and user_id = ?`

    pool.query(sql, [reviewId, userId], ((err, data) => {
        if(err){
            res.send(result.createResult(err, null))
        } else if(data.affectedRows == 0) {
            res.send(result.createResult('Review not found or unauthorized', null))
        } else {
            res.send(result.createResult(null, data))
        }
    }))
})



router.put('/:id', (req, res) => {
  const { review, rating, userId } = req.body
  const reviewId = req.params.id

  const sql = `
    UPDATE reviews
    SET review = ?, rating = ?, modified = NOW()
    WHERE id = ? AND user_id = ?
  `

  pool.query(sql, [review, rating, reviewId, userId], (err, data) => {
    if (data.affectedRows === 0) {
      res.send(result.createResult('Unauthorized or not found', null))
    } else {
      res.send(result.createResult(null, data))
    }
  })
})

router.get('/share/:id', (req, res) => {
  const sql = `
    SELECT
      r.id,
      r.review,
      r.rating,
      r.modified,
      m.title,
      u.first_name,
      u.last_name
    FROM reviews r
    JOIN movies m ON r.movie_id = m.id
    JOIN users u ON r.user_id = u.id
    WHERE r.id = ?
  `
  pool.query(sql, [req.params.id], (err, data) => {
    res.send(result.createResult(err, data))
  })
})

router.post('/share', (req, res) => {
  const { reviewId, shareIds } = req.body

  if (!reviewId || !shareIds || shareIds.length === 0) {
    return res.send(result.createResult('Invalid share data', null))
  }

  // Build values for bulk insert
  const values = shareIds.map(shareId => [reviewId, shareId])

  const sql = `
    INSERT INTO shares (review_id, user_id)
    VALUES ?
  `

  pool.query(sql, [values], (err, data) => {
    if (err) {
      res.send(result.createResult(err, null))
    } else {
      res.send(result.createResult(null, data))
    }
  })
})

router.get('/shared-with-me', (req, res) => {
  const userId = req.query.userId

  if (!userId) {
    return res.send(result.createResult('userId is required', null))
  }

  const sql = `
    SELECT
      r.id,
      r.review,
      r.rating,
      r.modified,
      m.title,
      u.first_name,
      u.last_name
    FROM shares s
    JOIN reviews r ON s.review_id = r.id
    JOIN movies m ON r.movie_id = m.id
    JOIN users u ON r.user_id = u.id
    WHERE s.user_id = ?
    ORDER BY r.modified DESC
  `

  pool.query(sql, [userId], (err, data) => {
    res.send(result.createResult(err, data))
  })
})


router.get('/:id', (req, res) => {
  const sql = `
    SELECT r.id, r.review, r.rating, m.title
    FROM reviews r
    JOIN movies m ON r.movie_id = m.id
    WHERE r.id = ?
  `
  pool.query(sql, [req.params.id], (err, data) => {
    res.send(result.createResult(err, data))
  })
})



module.exports = router