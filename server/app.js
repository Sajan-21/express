const express = require('express');
const app = express();
const dotenv = require('dotenv');
const { default: mongoose } = require('mongoose');
dotenv.config();

async function mongoConnect() {
    try {

        await mongoose.connect(process.env.MONGODB_URI);
        console.log("database connection established...");
        
    } catch (error) {

        console.log("database connection error");
        
    }
}

let usersSchema = new mongoose.Schema({
    name : String,
    email : String,
    age : Number,
    password : String,
});

let users = mongoose.model("users",usersSchema);

mongoConnect();

app.get('/test',
    (req,res,next) => {
        console.log("first middleware");
        next();
    },
    (req,res,next) => {
        console.log("second middleware");
        next();
    },
    (req,res) => {
        console.log("third middleware");
        res.status(200).send("sucess");
    }
)

app.listen(process.env.PORT, () => {
console.log(`server running at http://localhost:${process.env.PORT}`);
})