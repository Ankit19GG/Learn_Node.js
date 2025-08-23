const express=require('express');
const router=express.Router();
const {userSignup}=require('../controllers/user')

router.post('/',userSignup);

module.exports = router;