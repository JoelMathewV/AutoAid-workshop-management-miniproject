const mongoose=require ("mongoose");
const employeeSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    salary:{
        type:Number
    },
    works:{
        type: [String]
    }
});
const Employee= new mongoose.model("Employee",employeeSchema);
module.exports=Employee;