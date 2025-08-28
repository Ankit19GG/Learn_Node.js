const { v4: uuidv4 } = require('uuid');
const { response } = require('express');
const User = require('../models/user');
const {setUser,getUser}=require('../services/auth');

async function userSignup(req,res) {
    const {name,email,password}=req.body;
    if(!name||!email||!password) return res.status(400).json({error:"Insufficient information!"});
    try {
      await User.create({
        name,
        email,
        password,
        loginHistory:[],
       });
       return res.redirect("/");
    } catch(err){
        return res.json({error:"Duplicate Entry"});
    }
    
}

async function userLogin(req,res) {
    const {email,password}=req.body;
    const user = await User.findOne({email,password});
    if(!user)
        return res.render("login",{
           error:"Invalid Username or Password",
        })

    const sessionId=uuidv4();
    setUser(sessionId,user);
    res.cookie("uid",sessionId);
    return res.redirect("/");
};

module.exports= {userSignup,userLogin};