const express = require('express')
const router = express.Router();
const {signUp, login, logout,refetch} = require('../controller/auth');
const {getuser,deleteUser} =require('../controller/userController');
const {createPost,updatePost,deletePost, getAllPost, getPost,imagePost} = require('../controller/postController');
const {deleteComment,updateComment,createComment,getcomment,getAllComment} = require('../controller/commentController')
const {verify} =require('../middleware/verifyToken')
const upload = require('../middleware/multer');
const {getProfile} = require ('../controller/profile')

//auth routes
router.post('/login',login);
router.post('/signup',signUp);
router.get('/logout',logout);
router.post('/refetch',refetch); //to refetch user on reload

//user Routers
router.get('/getuser/:id',verify,getuser);
router.delete('/deleteuser/:id',verify,deleteUser);


//post routes
router.get('/post',getAllPost);
router.get('/post/:id',getPost);
router.post('/post/createpost',verify,upload.single('image'),createPost); 
router.put('/post/update/:id',upload.single('image'),updatePost);//verify,
router.delete('/post/delete/:id',verify,deletePost);


//comment routes
router.post("/post/comment/:id",verify,createComment);
router.put("/post/updatecomment/:id",verify,updateComment);
router.delete("/post/deletecomment/:id",verify,deleteComment);
router.get("/post/comment/:id",verify,getcomment);

// profile routes
router.get('/profile/:id',verify,getProfile);

module.exports = router;