require('dotenv').config();
const express=require('express');
const app=express();
const authRouter=require('./routes/auth.js')
const mongoose=require('mongoose');
const testRoute=require('./routes/test')
const postRouter=require("./routes/post")
require('dotenv').config();
app.use(express.json());
app.use(express.urlencoded({
    extended:'',
}));
const connectDB= async()=>{
    try{
     await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.pnv8m.mongodb.net/?retryWrites=true&w=majority`,{
useNewUrlParser:true,
useUnifiedTopology:true,
     })   
     console.log('connect!')
    }
    catch(err){
console.log(err.message);
process.exit(1);
    }
}
//sdfds
connectDB();
app.use('/api/post',postRouter);
app.use('/',testRoute);
app.use('/api/auth',authRouter)

const PORT=process.env.PORT||3000;
app.listen(PORT,()=>{})