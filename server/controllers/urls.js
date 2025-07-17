const express = require("express");
const shortid = require("shortid");
const Url = require("../models/urls.js");

const handleRedirectURL = async (req,res) =>{
    const shortId = req.params.id
    try{    
    const entry = await Url.findOne({shortURL:shortId})
    if(entry){
        entry.visitHistory.push({timestamp:Date.now()});
        await entry.save();
        return res.redirect(entry.originalURL)
    }
    else{
        return res.status(404).send("URL not found");
    }
    }
    catch(err){
        console.log(err);
        res.status(500).send("Server error")
    }
}

const handleGetURLSData = async (req,res)=>{
    try{
        const urls = await Url.find({});
        res.json(urls)
    }
    catch(err){ console.log(err) }
}

const handleGetUserURLs = async (req, res) => {
    try {
        const userId = req.user._id;
        const urls = await Url.find({ createdBy: userId });
        res.json(urls);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server error" });
    }
};

const handleGenerateURL = async (req,res)=>{
    try{
    const {input_url} = req.body;
    shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@')
    const id = shortid.generate()


    const newUrl = new Url({
        shortURL:id,
        originalURL:input_url,
        visitHistory: [new Date()],
    })
    await newUrl.save();
    res.json({message:"Data store"})
    }
    catch(err){ console.log(err) }    
}


module.exports = {
    handleRedirectURL,
    handleGetURLSData,
    handleGenerateURL,
    handleGetUserURLs,
};