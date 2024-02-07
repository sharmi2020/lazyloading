const express= require("express");
const mongoose=require("mongoose");

require("dotenv").config();

const app=express();
const port=3000;
app.use(express.json());
mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log("MongoDB is connected");
})
app.get("/",(req,res)=>{
    res.send("hello world!");
});
app.listen(port,()=>{
    console.log(`server is listening on ${port}`);
})