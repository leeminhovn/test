const express=require('express');
const router=express.Router();
const User=require('../app/controller/models/userModel')
const argon2=require('argon2');
const jwt=require('jsonwebtoken');
const userModel = require('../app/controller/models/userModel');
require('dotenv').config();
router.get('/',(req,res)=>{
    res.send('check');
})
router.post('/register',
async(req,res)=>{

    const {username,password}=req.body;
    if(!username||!password){
        return res.status(400).json(
            {success:false,
            message:"missing usernam or password"
            })
    }
    try{
const user=await User.findOne({username})
if(user){

    res.status(400).json(
        {success:false,
        message:"username already create"
        })
        return;  

    };
const hashedPassword=await argon2.hash(password);
const newUser= new User({username,password:hashedPassword});
 const check=await newUser.save();
 //add newUser này vào csdl 
const accessToken=jwt.sign({userId:newUser._id}, process.env.ACCESS_TOKEN_SECRET) ;  

res.json({success:true,message:"user create successful"
 , accessToken});

}
    catch(erro){
     res.status(400).json('faile resgiter :'+erro)
    }
}
)
router.post('/login',async(req,res)=>{
    const {username,password}=req.body;
    if(!username,!password){
        res.status(400).json({success:false,message:'you miss username of password'})
    }
    //check request
    try{
  const user = await userModel.findOne({username});
  if(!user){
    res.status(400).json({success:false,message:'incorrect username'})
return;  
}
  const passwordValid=await argon2.verify(user.password,password);
  //verify password dc ma hoa trong DB
  //so voi password nam trong request
  if(!passwordValid){
    res.status(400)
    .json({success:false,message:"password in correct"})
return;  
}
  const accessToken=jwt.sign({ userId:user._id
  },process.env.ACCESS_TOKEN_SECRET)
  res.json({
      success:true,
      accessToken
  })
 
    }
    catch(err){
        res.status(400)
        .json({success:false,message:"can/'t connect DB"})
    }
//   all good

})
module.exports=router;