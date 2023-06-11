const mongoose=require ("mongoose");
const employeeSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    salary:{
        type:Number,
        required:true
    },
    works:{
        type: [mongoose.Schema.Types.String],
        required: true
    }
});
const Employee= new mongoose.model("Employee",employeeSchema);
module.exports=Employee;