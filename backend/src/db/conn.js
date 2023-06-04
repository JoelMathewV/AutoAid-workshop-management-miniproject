const mongoose = require("mongoose");
require('dotenv').config({path:__dirname+'/../../.env'})
const uri = process.env.URI;

mongoose.connect(uri).then(() => {
    console.log("success")
}).catch(error => console.error('Error connecting to MongoDB Atlas', error));