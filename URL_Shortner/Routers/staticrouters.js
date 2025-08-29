const express = require('express');
const URL = require('../models/url');
const {restrictToLoggedinUser}=require('../middlewares/auth')


const router=express.Router();

router.get("/", restrictToLoggedinUser,async (req,res) => {
    const createdBy=req.user._id
    const allUrls = await URL.find({createdBy});
    return res.render("home",{
        urls: allUrls,
    })
});

router.get("/signup",(req,res)=>{
    return res.render("signup");
});


router.get("/login",(req,res)=>{
    return res.render("login");
})


module.exports= router;