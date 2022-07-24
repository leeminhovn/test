const testModel=require('./models/testModel')
class Test{

    index(req,res){
const newData=new testModel({
    username:'1 minh a chap',
password:'123456789',})
console.log(newData)
    
}
}
module.exports=new Test;