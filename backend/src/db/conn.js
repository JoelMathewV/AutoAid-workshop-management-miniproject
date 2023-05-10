const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://joelmathewv0819:pIy1n3gw0pJwEwgm@autoworkshop.eb7cuhr.mongodb.net/?retryWrites=true&w=majority/regis").then(() => {
    console.log("success")
}).catch(error => handleError(error));