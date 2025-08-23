const { response } = require('express');
const User = require('../models/user');

async function userSignup(req,res) {
    const {name,email,password}=req.body;
    if(!name||!email||!password) return res.status(400).json({error:"Insufficient information!"});
    await User.create({
        name,
        email,
        password,
        loginHistory:[],
    })
    res.render("home")
}

module.exports= {userSignup};