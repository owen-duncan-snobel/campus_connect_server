import { ListBucketsCommand, ListObjectsCommand, ListObjectsCommandInput, S3 } from '@aws-sdk/client-s3'
import path from 'path'
import fs from 'fs'

  const s3Client = new S3({
    forcePathStyle: false,
    endpoint:"https://nyc3.digitaloceanspaces.com",
    region:"us-east-1",
    credentials:{
      accessKeyId: process.env.SPACES_KEY,
      secretAccessKey: process.env.SPACES_SECRET
    },
  })

  const uploadFile = (file, bucketName: string, class_name: string, class_year: string) => {
    const fileStream = fs.createReadStream(file.path)
    /*  ex. file
       fieldname: 'files',
        originalname: 'sample copy 3.pdf',
        encoding: '7bit',
        mimetype: 'application/pdf',
        destination: 'uploads/',
        filename: '3519d82534b535a5faf2a59fa1e63271',
        path: 'uploads/3519d82534b535a5faf2a59fa1e63271',
        size: 3028
    */
    const bucketParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: `${class_name}/${class_year}/${file.originalname}`,
        ACL: 'public-read' // make file that is uploaded public-read
    }
  return s3Client.putObject(bucketParams)
}

const getFiles = async (bucketName: string, class_name: string, class_year: string) => {
  try {
    return await s3Client.send(new ListObjectsCommand({Bucket: bucketName}))
  } catch (err) {
    console.log("Error", err);
  }
  return null
}

  export { s3Client, uploadFile, getFiles }