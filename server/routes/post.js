const express=require('express')
const router=express.Router();
const postController=require('../app/controller/postController')
const verifyToken=require('./middleware/auth');
router.post('/',verifyToken,postController.index);
router.get('/',verifyToken,postController.GetData);
router.put('/:id',verifyToken,postController.updatePost);
router.delete('/:id',verifyToken,postController.deletePost)
module.exports=router;