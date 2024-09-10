const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const mongoConnect = require('../server/db/mongoConnect/mongoConnect');
const routes = require('../server/routes/routes');
const userControllers = require('../server/userControllers/userControllers');

app.use(express.static('../client'));

app.listen(process.env.PORT, () => {
    console.log(`server running at http://localhost:${process.env.PORT}`);
});