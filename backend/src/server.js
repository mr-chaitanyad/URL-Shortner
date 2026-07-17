require("dotenv").config();

const app = require("./app.js");
const connectDB = require("./config/db");



const PORT = 5000 || process.env.PORT;

const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log("Server is running on port " + PORT);
    });
};

startServer();
