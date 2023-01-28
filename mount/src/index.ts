import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const v1 = require('./v1/index')

const app = express()

// middleware
app.use(express.json())
app.use(cors())
app.options('*', cors())

//app.use('/api/v1', v1)

app.get('/', (req, res) => {
  return res.status(200).json({
    message: 'Ping'
  })
})

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`)
})