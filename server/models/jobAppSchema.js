const mongoose = require('mongoose');

const jobAppSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    workEmail: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    cvFile: {
        type: String, // Store the file path as a string
    },
});

const JobApplication = mongoose.model('JOBAPPLICATION', jobAppSchema);

module.exports = JobApplication;
