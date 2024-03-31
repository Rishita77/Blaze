const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
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
    frequency: {
        type:String,
        required: true
        
    },
    motivation: {
        type:String
    },
    favfeature: {
        type:String
    
    },
    improve: {
        type: String
    },
    idea: {
        type: String
    }
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;
