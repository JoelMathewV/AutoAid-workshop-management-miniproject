const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/regis").then(() => {
    console.log("success")
}).catch(error => handleError(error));