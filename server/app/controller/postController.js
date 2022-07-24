const postModel=require('./models/postModel')
class PostController{

    async index(req,res){
  const {title,description,url,status,user}=req.body;
  if(!title){
    return res.status(401).json({
        success:false,
        message:'pls enter your skill title'})
    
  }
  try{
    const newPost=new postModel({title,description,
        url:url.startsWith('http://')?
        url:("http://"+url),
        status:status||'TO LEARN',
        user:req.userId
    })

await newPost.save();

 res.json({success:true,message:"happy learning",response:newPost})
}
  catch(err){
    console.log(err);
    res.status(401).json({success:false,
message:"erro post save"}
)   
  }
    
}
async GetData(req,res){
  try{
    const posts=await postModel.find({user:req.userId}).populate('user',['username']);
res.json(posts);
  }
catch(err){
  console.log(err );

res.status(403).json({success:false,message:'can not get data'})

}
}
async updatePost(req,res){

    const {title,description,url,status,user}=req.body;
    if(!title){
      return res.status(401).json({
          success:false,
          message:'pls enter your skill title'})
      
    }
    try{
      let updatePost={
         title,
         description,
          url:url.startsWith('http://')?
          url:("http://"+url),
          status:status||'TO LEARN',
          user:req.userId
      }
const postUpdateCondition={_id:req.params.id,user:req.userId}
updatePost =await postModel.findOneAndUpdate(
  postUpdateCondition,updatePost,{new:true}
)
//1:tim post muon update
//2:thay doi cac field theo updatePost
//3:??
if(!updatePost){
  res.status(403).json({success:false,message:'notfound'})
}
res.json({success:true,message:'update post!'})
}
catch(err){ 
  console.log(err);
  res.status(403).json({success:false,message:'erro'})

}
}
async deletePost(req,res){
const postId=req.params.id;
const userId=req.userId;
try{
  const postDelete=await postModel.findOneAndDelete({
    _id:postId,
    user:userId
  })
  if(!postDelete){
    res.status(403).json({
    success:false,
    message:'post found'
    })
    return;
  }
res.json({success:true,message:'success delete post '});

}
catch(err){
  console.log(err);
  res.status(401).json({success:false,message:'server have problem'})
}

}
}
module.exports=new PostController;