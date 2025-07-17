const express = require("express");
const User = require("../models/user.js");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const secretKey = "ABCD@1234";


const handleSignupUser = async (req,res)=>{
    try{
    const {email,pass,cpass} = req.body;
    console.log(email);

    if(cpass==pass){
        const newUser =  new User({
            email:email,
            password:pass,
        })
        await newUser.save();
        console.log("New User created");
        return res.json({message : "New user created"})
    }else{
        return res.json({message : "Password Not match"})
    }
    }
    catch(err){ console.log(err) }
}

const handleLoginUser = async (req,res) =>{
    try{
        const {email,pass} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.json({message:"User not found"}).status(404);
        }
        if (user.password !== pass) {
            return res.json({message:"Invalid password"}).status(400);
        }
        const payload  = {userId:user._id,email:user.email}
        const token = jwt.sign(payload,secretKey,{ expiresIn: "1h" })

        res.json({message:"Login Successfully",token});
    }
    catch(err){ 
        console.log(err);
        res.json({message:"Server error"}).status(500)
    }
}

module.exports = {
    handleSignupUser,
    handleLoginUser
}