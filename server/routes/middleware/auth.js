const jwt =require('jsonwebtoken');
const verifyToken=(req,res,next)=>{
const authHeader=req.headers['authorization'];
//bear token
const token=authHeader.split(' ')[1];
if(!token){return res.status(401).json({
    success:false,
    message:'can\'t get token'
})}
try{
const decode=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
req.userId=decode.userId;
}
catch(err){
console.log(err);
return res.status(403).json({
    success:false,
    message:'invalid token'
});
}
next();
}
module.exports=verifyToken;