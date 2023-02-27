const express = require("express");
const app = express();
const cors = require('cors')
const port = process.env.PORT || 8000;
const host = "0.0.0.0";
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require('multer')
const path=require('path')
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
app.use(cors());
dotenv.config();

const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@cluster0.lzwpo.mongodb.net/?retryWrites=true&w=majority`;

mongoose
  .connect(uri)
  .then(() => {
    app.listen(port, host, () => {
      console.log(`Server running at http://${host}:${port}/`);
    });
  })
  .catch((e) => console.log(e));

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use("/images",express.static(path.join(__dirname,'public/images')))

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null,'public/images')
  },
  filename: (req, file, cb) => {
    cb(null,file.originalname)
  }
})

const upload = multer({storage})
app.post('/api/upload', upload.single('file'), (req, res) => {
  try {
    return res.status(200).json('File uploaded successfully')
  } catch (error) {
    console.log(error);
  }
})

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
