const express = require("express");
const mongoose = require("mongoose");
 

const UrlSchema = new mongoose.Schema({
    shortURL : String,
    originalURL : String,
    visitHistory: [{ timestamp: { type: Date } }],
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    }
},{ timestamps: true })

const Url = mongoose.model('url', UrlSchema);

module.exports = Url;