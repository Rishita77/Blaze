const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name : {
        type:String,
        required:true
    },
    phone : {
        type:Number,
        required:true,
        unique:true
    },
    email : {
        type:String,
        required:true,
        unique:true
    },
    password : {
        type:String,
        required:true
    }
})

const Register = new mongoose.model("Student", studentSchema)

module.exports = Register;
