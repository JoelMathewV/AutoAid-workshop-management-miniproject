const mongoose = require("mongoose");
const uri = process.env.URI;

mongoose.connect(uri).then(() => {
    console.log("success")
}).catch(error => console.error('Error connecting to MongoDB Atlas', error));