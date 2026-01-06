const express = require('express')
const  cors = require('cors')

const userRouter = require('./routes/user')
const movieRouter = require('./routes/movie')
const reviewRouter = require('./routes/review')
const app = express() 

app.use(cors())
app.use(express.json())
app.use('/user',userRouter)
app.use('/movie',movieRouter)
app.use('/review',reviewRouter)
app.listen(4000, 'localhost', () =>{
    console.log("Server started at 4000")
})