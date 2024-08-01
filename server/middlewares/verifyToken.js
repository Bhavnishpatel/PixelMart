const jwt=require('jsonwebtoken');

const verifyToken=async(req,res,next) =>{
    const authHeader=req.headers["authorization"];
    console.log(authHeader)
    const token=authHeader && authHeader.split(" ")[1];
    console.log(token)
    if(!token) return res.status(401).json({success:false,message:"Unauthorized"});
    try {
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
            if(err) return res.status(403).json({success:false,message:"Forbidden Request" });   
            req.id=user.id;
            req.author=user.author;
            req.accountType=user.accountType;
        })
        next();
    } catch (error) {
        return res.status(500).json({success:false,message:"Internal Server Error"});
    }
}

module.exports={verifyToken};