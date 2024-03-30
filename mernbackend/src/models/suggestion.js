const mongoose = require("mongoose");

const suggestionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type:String,
        required: true
    },
    college: {
        type:String,
        required: true
    },
    phnumber: {
        type:String,
        required: true
        
    },
    subject: {
        type:String,
        required: true
    },
    message: {
        type:String,
        required: true
    },
    speaker: {
        type: String
    }
});

const Suggestion = mongoose.model("Suggestion", suggestionSchema);

module.exports = Suggestion;
