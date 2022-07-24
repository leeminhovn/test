const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const testModel=Schema({
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
  createAt:{
    type:Date,
    default:Date.now(),
  }
})
module.exports=mongoose.model('userLogin',testModel)