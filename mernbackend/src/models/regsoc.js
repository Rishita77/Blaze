const mongoose = require("mongoose");

const RegSocSchema = new mongoose.Schema({
    president: {
        type: String,
        required: true
    },
    email: {
        type:String,
        required: true
    },
    emailsoc: {
        type:String,
        required: true
    },
    college: {
        type:String,
        required: true
        
    },
    phone: {
        type:String
    },
    name: {
        type:String,
        required: true
    },
    message: {
        type: String
    }
});

const RegisterSoc = mongoose.model("SocietiesReg", RegSocSchema);

module.exports = RegisterSoc;
