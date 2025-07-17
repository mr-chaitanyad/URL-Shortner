const express = require("express")
const cors = require('cors');
const connectDB = require("./connection.js")
const app = express();
const Url = require("./models/urls.js");
const {handleRedirectURL,handleGetURLSData,handleGenerateURL,handleGetUserURLs} = require("./controllers/urls.js")
const {handleSignupUser,handleLoginUser} = require("./controllers/user.js")

app.use(express.json())
app.use(express.urlencoded({extended:false}))

connectDB();

app.use(cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 
}));

app.post("/signup",handleSignupUser)
app.post("/login",handleLoginUser)
app.get("/table",handleGetURLSData);
app.get("/myurl", handleGetUserURLs);



app.get("/:id",handleRedirectURL)
app.post("/submit",handleGenerateURL)


app.listen(5000,()=>{
    console.log("Server started at 5000");
})
