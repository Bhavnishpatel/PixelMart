const router=require('express').Router();
const { createPost, getAllPosts, getMyPost } = require('../controllers/postController');
const {verifyToken}=require('../middlewares/verifyToken.js')


router.post('/create',verifyToken,createPost);
router.get('/getAll',getAllPosts);
router.get('/myPost',verifyToken,getMyPost);



module.exports=router;
