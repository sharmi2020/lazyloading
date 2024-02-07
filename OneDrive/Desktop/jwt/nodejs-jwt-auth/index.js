const express= require("express");
const authRouter=require('./routes/auth');
const mongoose=require("mongoose");
const verifyJWT=require('./middleWare');

require("dotenv").config();

const app=express();
const port=3000;
app.use(express.json());
mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log("MongoDB is connected");
})
app.use(express.json());

app.use('/auth',authRouter);
app.get("/decodeDetails",verifyJWT,(req,res)=>{
    const{username}=req.user
    res.json({username});
});
app.listen(port,()=>{
    console.log(`server is listening on port ${port}`);
})