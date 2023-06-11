//parts used,total price
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
    },
    parts:{
        type: [mongoose.Schema.Types.String],
        required: true
    },
    t_cost:{
        type:Number,
        required:true
    }
});

const Complete = new mongoose.model("Complete", employeeSchema);
module.exports = Complete;