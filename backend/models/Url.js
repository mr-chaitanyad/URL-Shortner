const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
    },
    
    originalUrl :{
        type : String,
        required : true,
        trim : true
    },

    shortCode :{ 
        type : String,
        required : true,
        unique : true,
    },

    shortUrl :{
        type : String,
        required : true,
    },

    totalClicks :{
        type : Number,
        default : 0
    }
},
{
    timestamps : true,
})


module.exports = mongoose.model("Url", urlSchema);