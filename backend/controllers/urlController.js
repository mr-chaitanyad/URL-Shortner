const { nanoid } = require('nanoid');
const Url = require("../models/Url");
const Click = require("../models/Click");
const UAParser = require('ua-parser-js');
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

        // Find URL
        const url = await Url.findOne({ shortCode });

        if (!url) {
            return res.status(404).json({
                success: false,
                message: "Short URL not found"
            });
        }
        const parser = new UAParser(req.headers["user-agent"]);
        const result = parser.getResult();

        const location = await getGeoLocation(req.ip);

        // Save Click Analytics
        const click = await Click.create({

        urlId: url._id,
        ip: req.ip,
        browser: result.browser.name,
        os: result.os.name,
        device: result.device.type || "Desktop",
        referrer: req.get("referer") || "Direct",
        userAgent: req.headers["user-agent"],
        country: location?.country,
        region: location?.region,
        city: location?.city,
        latitude: location?.lat,
        longitude: location?.lon,
        timezone: location?.timezone,
        isp: location?.isp
    });
        console.log("Click saved:", click);
        // Increase click count
        url.totalClicks += 1;

        await url.save();
        console.log("URL updated with new click count:", url.originalUrl)
        // Redirect
        return res.redirect(url.originalUrl);


    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

module.exports = {
    createShortUrl,
    redirectUrl,
    getMyUrls
}