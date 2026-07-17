const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const urlRoutes = require("../routes/urlRoutes");
const { redirectUrl } = require("../controllers/urlController");

const authRoutes = require("../routes/authRoutes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.get ("/",(req,res)=>{
    res.json({
        success : true,
        message : "Welcome to the API"
    });
})

app.use("/api/url",urlRoutes);
app.use("/api/auth",authRoutes);


app.get("/:shortCode", redirectUrl);
    
module.exports = app;