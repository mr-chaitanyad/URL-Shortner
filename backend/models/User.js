const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        requrired :  [true, "Name is required"],
        trim : true,
        minlength : 3,
        maxlength : 50
    },
    email :{
        type : String,
        required : [true, "Email is required"],
        unique : true,
        lowercase : true,
        trime : true,
        validate(val)
        {
            if(!validator.isEmail(val))
            {
                throw new Error("Please provide a valid email");
            }
        },
    },
    password : {
        type : String,
        required : [true, "Password is required"],
        minlength : 6,

    },
    
},
{
    timestamps : true
})

module.exports = mongoose.model("User", userSchema);