const express = require('express')
const app = express()
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const path = require('path')
const authRoute = require("./routes/auth")
const productRoute = require("./routes/product")
const userRoute = require("./routes/user")
const multer = require("multer")
const cors = require("cors");

const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))

dotenv.config();
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')))


mongoose.connect(process.env.MONGO_URL).then(console.log("Connected to MongoDB")).catch((err) => console.log(err))

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({storage : storage})
app.post("/api/upload", upload.single("file"), (req,res) =>{
    try{
        return res.status(200).json("file uploaded successfully")
    }catch(err){
        console.log(err)
    }
})

app.use("/api/auth", authRoute)
app.use("/api/product", productRoute)
app.use("/api/user", userRoute)


app.listen(8000, () => {
  console.log(`Backend is running !!!`)
})