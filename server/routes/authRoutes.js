const router=require('express').Router();
const { signup, login, refresh, switchProfile } = require('../controllers/authController');
const {verifyToken}=require('../middlewares/verifyToken.js')


router.post('/signup',signup);
router.post('/login',login);
router.get('/refresh',refresh);
router.get('/switch',verifyToken,switchProfile);

module.exports=router;