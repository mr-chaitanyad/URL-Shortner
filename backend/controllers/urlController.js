const { nanoid } = require('nanoid');
const Url = require("../models/Url");


const getGeoLocation = require("../src/utils/getGeoLocation");


const createShortUrl = async (req,res) =>{
    try{
        const { originalUrl } = req.body;
    
        if(!originalUrl){
            return res.status(400).json({
                status: "error",
                message: "Original URL is required"
            });
        }

        const shortCode = nanoid(8);
        
        const shortUrl = `${process.env.BASE_URL}/${shortCode}`;

        const newUrl = new Url({
            user: req.user._id,
            originalUrl,
            shortCode,
            shortUrl,
        })

        await newUrl.save();
        
        res.status(201).json({
            sucess : true,
            data : newUrl
        })
    }

    catch(err){
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Server Error"
        })
    }
}

const getMyUrls = async (req,res) =>{
    try{
        const urls = await Url.find({ user : req.user._id }).sort({ createdAt: -1 });

        res.status(200).json({
            success : true,
            count : urls.length,
            data : urls
        })
    }
    catch(err){
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Server Error"
        })
    }
}

const redirectUrl = async (req, res) => {

    try {

        const { shortCode } = req.params;

        const url = await Url.findOne({ shortCode });

        
        if (!url) {
            return res.status(404).send("URL not found");
        }
       
        url.totalClicks += 1;
        await url.save();

        return res.redirect(url.originalUrl);

    } catch (err) {

        console.log(err);

        return res.status(500).send("Server Error");

    }

};


module.exports = {
    createShortUrl,
    redirectUrl,
    getMyUrls
}