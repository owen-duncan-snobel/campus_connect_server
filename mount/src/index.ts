import express, {Request}from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { s3Client, uploadFile, getFiles } from './utils/s3'
import fs from 'fs'
import path from 'path'
import multer, { Multer } from 'multer'
import { ListObjectsCommandInput } from '@aws-sdk/client-s3'
const upload = multer({ dest: 'uploads/' })

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
    message: 'Ping Pong Ching Chong'
  })
})

// get all files
app.get('/files', async (req, res) => {
  const {
    class_name,
    class_year
  } = req.body
  const files = await getFiles("campusconnect", class_name, class_year);
  return res.status(200).json({
    message:"File success",
    data: files.Contents
  });
})



// get specific file
app.get('/file/:id', (req, res) => {
  
})

interface MulterRequest extends Request {
    file: any;
    files: any;
}

app.post('/files/upload', upload.array('files', 10), async (req: MulterRequest, res) => {
  // const fileStream = fs.createReadStream(path.join(__dirname,'sample.pdf')) // doesn't work currently fix after
  // const uploadedFile = await uploadFile('', 'campus_connect', '1234')
  const {
    class_name,
    class_year,
  } = req.body

  const files = req.files
  for (let i = 0; i < files.length; i++){
    await uploadFile(files[i], 'campusconnect', class_name,  class_year)
  }
  // await s3Client.putObject(bucketParams)
  res.status(200).json({
    message: 'file uploaded'
  })
})

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`)
})
