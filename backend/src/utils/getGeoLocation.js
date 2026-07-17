const axios = require("axios");

const geoGeoLocation = async (ip) =>{
    try{
        if( ip==="::1" || ip === "127.0.0.1" ){
            return {
                country : "Localhost",
                region : "Localhost",
                city : "Localhost",
                lat: null,
                lon: null,
                timezone: "Local",
                isp: "Localhost"
            }
        }
        const { data } = await axios.get(`http://ip-api.com/json/${ip}`);

        return {
            country: data.country,
            region: data.regionName,
            city: data.city,
            lat: data.lat,
            lon: data.lon,
            timezone: data.timezone,
            isp: data.isp
        };

    }
    catch(err){
        console.error(err);
        return null;
    }
}

module.exports = geoGeoLocation;