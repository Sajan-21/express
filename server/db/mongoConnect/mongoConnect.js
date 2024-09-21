const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();

const mongoConnect = async function() {

    try {

        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database connection established...");
        
    } catch (error) {

        console.log("Error while connecting database : ",error);
        
    }

}

module.exports = mongoConnect;