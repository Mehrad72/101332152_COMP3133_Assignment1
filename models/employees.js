const mongoose = require ('mongoose');
const employees = new mongoose.Schema ({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female', 'other'],
    },
    salary: {
        type: Number,
        required: true,
    },
});
module.exports = mongoose.model ('employees', employees);
