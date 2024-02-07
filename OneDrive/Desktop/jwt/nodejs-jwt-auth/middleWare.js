const jwt = require("jsonwebtoken");

function verifyJWT(req,res,next){
    const token= req.headers["authorization"];
    if(!token){
        return res.status(401).json({message:"Access denied"});
    }
    jwt.verify(token,process.env.SECRET_KEY,(e,data)=>{
        if(e){
            return res.status(401).json({message:"failed to authenticate token"});
        }
        req.user=data;
        next();
    })
}

module.exports=verifyJWT;