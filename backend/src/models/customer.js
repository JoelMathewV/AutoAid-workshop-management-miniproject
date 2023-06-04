const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    vehicle_no:{
        type:String,
        required: true
    },
    phone:{
        type:Number,
        required: true
    },
    chassis:{
        type: String,
        required: true
    },
    problem:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true
    }
});

const Customer = new mongoose.model("Customer", employeeSchema);

module.exports = Customer;