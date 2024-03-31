const mongoose = require("mongoose");

const collabSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    emailp: {
        type:String,
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
    phone: {
        type:String
    },
    event: {
        type:String
    
    },
    pcollege: {
        type: String
    },
    society: {
        type: String
    },
    details: {
        type: String
    },
    poster: {
        type: Image
    }
});

const Collab = mongoose.model("Collab", collabSchema);

module.exports = Collab;
