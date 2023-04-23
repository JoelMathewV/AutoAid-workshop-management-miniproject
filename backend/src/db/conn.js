const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/regis").then(() => {
    console.log("success")
}).catch(error => handleError(error));

// const fruitSchenma = new mongoose.Schema({
//     name: String,
//     rating: Number,
//     review: String
// });

// const Fruit = mongoose.model("Fruit", fruitSchenma);

// const fruit = new Fruit ({
//     name: "Apple",
//     rating: 7,
//     review: "pretty solid as a fruit"
// });

// fruit.save();