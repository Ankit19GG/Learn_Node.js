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
    });
    return res.redirect("/");
}

async function userLogin(req,res) {
    const {email,password}=req.body;
    const user = await User.findOne({email,password});
    if(!user)
        return res.render("login",{
           error:"Invalid Username or Password",
    })
    return res.redirect("/");
};

module.exports= {userSignup,userLogin};