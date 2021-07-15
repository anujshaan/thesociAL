const express = require ("express");
const mongoose = require ("mongoose");
const dotenv = require ("dotenv");
const morgan = require ("morgan");
const helmet = require ("helmet");
const userRoute = require("./Routes/users");
const authRoute = require("./Routes/auth");
const postRoute = require("./Routes/posts");
const multer = require("multer");
const path = require("path");
const router = express.Router();

const app = express();
dotenv.config();

mongoose.connect(process.env.DATA_URI, {useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex: true},()=>{
    console.log("DataBase connected successfully");
});

app.use("/images", express.static(path.join(__dirname, "public/images")));

//middleware
app.use(express.json()); //whenever made post request it will convert that in json file
app.use(helmet()); //securely sends post request
app.use(morgan("common")); //sends detail of post request

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"public/images");
    },
    filename:(req,file,cb)=>{
        cb(null,req.body.name);
    },
});

const upload = multer({storage:storage});
app.post("/api/upload", upload.single("file"), (req,res)=>{
    try{
        return res.status(200).json("File uploaded");
    }catch(e){
        console.log(e);
    }
})

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.listen(4000,()=>{
    console.log("server is up and running"); 
})