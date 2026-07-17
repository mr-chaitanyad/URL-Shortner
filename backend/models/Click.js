const mongoose = require('mongoose');

const clickSchema = new mongoose.Schema({
    urlId: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Url',
        required : true
    },

    ip : {
        type : String,
        required : true
    },

    browser : String,
    os : String,
    device : String,
    referer : String ,
    userAgent : String,

    country: String,
    region: String,
    city: String,
    latitude: Number,
    longitude: Number,
    timezone: String,
    isp: String,
},
{
    timestamps : true
});


module.exports = mongoose.model("Click", clickSchema);