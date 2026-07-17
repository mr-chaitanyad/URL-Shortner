const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const register = async (req,res)=>{
    try{
        const { name , email , password } = req.body;

        if(!name || !email || !password)
        {
            return res.status(400).json({
                success : false,
                msg :"Please provide all the required fields"
            })
        }

        const existingUser = await User.findOne({ email });

        if(existingUser)
        {
            return res.status(400).json({
                success : false,
                msg : "User alredy exists",
            })
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = await User.create({
            name,
            email,
            password : hashedPassword
        })
        await newUser.save();
        res.status(201).json({
            succes : true,
            msg : "User registered succesfully",
            user: {
                id : newUser._id,
                name : newUser.name,
                email : newUser.email
            },
        });

    }
    catch(err)
    {
        console.error(err);

        res.status(500).json({
            success : false,
            msg : "Server error",
        })
    }
}

const login = async (req,res) =>{
    try{
        const {email, password} = req.body;
        
        if(!email || !password)
        {
            return res.status(400).json({
                success : false,
                msg : "Please provide all the required fields"
            })
        }

        const user = await User.findOne({ email });

        if(!user)
        {
            return res.status(401).json({
                success : false,
                msg : "User not found"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch)
        {
            return res.status(401).json({
                success : false,
                msg : "Invalid credentials"
            })
        }

        
        const token = jwt.sign(
            { 
                id : user._id,
                email : user.email,
            }
            ,process.env.JWT_SECRET,{
                expiresIn : "7d"
            }
        );

        res.status(200).json({
            success : true,
            msg : "User logged in successfully",
            token,
            user :{
                id : user._id,
                name : user.name,
                email : user.email
            }
        })

    }
    catch(err){
        console.error(err);
        res.status(500).json({
            success : false,
            msg : "Server error",
        })
    }
}

module.exports = {
    registerUser : register,
    loginUser : login
}