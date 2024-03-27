const mongoose = require('mongoose');
const employeeSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
    },
    emailAddress: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    confirmPassword: {
        type: String,
        required: true,
    },
});

const Register = mongoose.model('Register', employeeSchema);

module.exports = Register;