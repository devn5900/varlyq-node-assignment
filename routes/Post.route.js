const {Router}= require('express');
const { isAuthorized } = require('../middlewares/authorization.middleware');
const { getPost, createPost, deletePost, updatePost, commentOnPost, updateComments } = require('../controllers/Post.controllers');

 const PostRouter= Router();

PostRouter.get("/",isAuthorized,getPost)
PostRouter.post("/",isAuthorized,createPost)
PostRouter.delete("/:postId",isAuthorized,deletePost)
PostRouter.post("/comment/:postId",isAuthorized,commentOnPost)
PostRouter.put("/comment/:postId/:commentId",isAuthorized,updateComments)
PostRouter.put("/:postId",isAuthorized,updatePost)
 module.exports={
    PostRouter
 }