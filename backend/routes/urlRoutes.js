const express = require("express");
const Url = require("../models/Url");
const { protect } = require("../src/middleware/authMiddleware");


const router = express.Router();

const { createShortUrl,redirectUrl,getMyUrls } = require("../controllers/urlController");

router.post("/shorten",protect,createShortUrl);
router.get("/myurls", protect, getMyUrls);


module.exports = router;