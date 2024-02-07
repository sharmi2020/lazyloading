const express = require("express");
const jwt= require("jsonwebtoken");
const User =require("../Models/User");
const router=express.Router();

//signup

router.post("/signUp" ,async(req,res)=>{
    try{
        const{username,password}=req.body;
        const user=new user({username,password});
        await user.save();
        res.status(201).json({message:"New user registered successfully"});

    }catch(error){
        res.status(500).json({message:"internal server error"});
    }
});

//Login

router.post("login",async(req,res)=>{
    const{username,password}=req.body;
    try{
        const user=await User.findOne({username});
        if(!user){
            return res.status(401).json({message:"invalid username or password"});
        }
        if(user.password!==password){
            return res.status(401).json({message:"invalid username or password"});
        }

        const token=jwt.sign(
            {id:user._id,username:user.username},
            process.env.SECRET_KEY
        );
        res.json({token});
    }catch(e){
        res.status(500).json({message:"internal server error "})
    }
});
 module.exports=router;