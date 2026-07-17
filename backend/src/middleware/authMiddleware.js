const jwt = require("jsonwebtoken");
const User = require("../../models/User");


const protect = async (req,res,next) =>{
    try{
        let token;
        if(
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        )
        {
            token = req.headers.authorization.split(" ")[1];
        }

        if(!token)
        {
            return res.status(401).json({
                success : false,
                msg : "Not Authorized, Token missing"
            })
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        req.user = await User.findById(decoded.id).select("-password");

        if(!req.user)
        {
            return res.status(401).json({
                success : false,
                msg : "Not Authorized, User not found"
            })
        }
        next();

    }
    catch(err)
    {
        console.error(err);
        return res.status(401).json({
            success : false,
            msg : "Not Authorized, Invalid Token"
        });
    }
}

module.exports = { protect };