const router=require('express').Router();
const { createPost, getAllPosts, getMyPost, deletePost, addToFavourites, removeToFavourites, searchPost, getFavourites, getPostByRange } = require('../controllers/postController');
const {verifyToken}=require('../middlewares/verifyToken.js')


router.post('/create',verifyToken,createPost);
router.get('/getAll',getAllPosts);
router.get('/myPost',verifyToken,getMyPost);
router.delete('/delete/:id',verifyToken,deletePost);
router.get('/serch',searchPost);
router.put('/addToFavourites/:postId',verifyToken,addToFavourites);
router.put('/removeFromFavourites/:postId',verifyToken,removeToFavourites);
router.get('/favourites',verifyToken,getFavourites);
router.get('/getPostByDateRange',verifyToken,getPostByRange);


module.exports=router;
