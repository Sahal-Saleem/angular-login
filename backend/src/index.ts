import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import multer from 'multer'
import path from 'path'
import userRoute from './routers/userRoute';
import adminRoute from './routers/adminRoute'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: 'http://localhost:4200' }));

app.use(cookieParser())

app.use('/image',express.static(path.join(__dirname, 'image')));
// app.use(fileUpload())
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/image');
  },
  filename: (req, file, cb) => {
    console.log('multer');
    const ext = path.extname(file.originalname);
    const timestamp = Date.now();
    const newFilename = `${timestamp}_${path.basename(file.originalname, ext)}.jpg`;
    cb(null, newFilename);
  }
});


app.use(multer({dest: 'image',storage: fileStorage}).array('image'))

app.use('/user',userRoute)
app.use('/admin',adminRoute)

mongoose.connect("mongodb://127.0.0.1:27017/SIGN_ME_UP")
.then(()=>{
    console.log("Connected to Database");
    app.listen(3000,()=>{
        console.log("App Listening on Port 3000");
    })
})