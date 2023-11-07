const express = require('express');
const router = express.Router();
const multer = require('multer'); // Import multer
const path = require('path');

require('../db/conn');
const Client = require('../models/clientSchema')

const JobApplication = require('../models/jobAppSchema');

//  client api 
router.post('/client-info-register', (req, res) => {
    console.log('client info page')

    const { fullName, workEmail, phoneNumber, companyName, companyLocation, companySize } = req.body
    if (!fullName || !workEmail || !phoneNumber || !companyName || !companyLocation || !companySize) {
        return res.status(422).json({ error: "please fill all fields" })
    }
    const client = new Client(req.body)
    client.save().then(() => {
        res.status(201).json({ message: 'client info created Sucessfully' })
    }).catch((err) => res.status(500).json({ error: "Failded To Client Info" }))

})


// cv api 

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, ''); // Specify the directory where uploaded files will be stored
    },
    filename: function (req, file, cb) {
        const extname = path.extname(file.originalname);
        const filename = Date.now() + extname;
        cb(null, filename);
    },
});

const fileFilter = (req, file, cb) => {
    // Allow all file types
    cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

router.post('/job-application-register', upload.single('cvFile'), (req, res) => {
    console.log('job-application page');

    const { fullName, workEmail, phoneNumber } = req.body;
    if (!fullName || !workEmail || !phoneNumber) {
        return res.status(422).json({ error: 'Please fill all fields' });
    }

    if (!req.file) {
        return res.status(422).json({ error: 'Please upload a valid file' });
    }

    // Assuming you have a 'cvFile' input field for uploading the CV
    const cvFilePath = req.file.path;

    const jobApplicationMine = new JobApplication({
        fullName,
        workEmail,
        phoneNumber,
        cvFile: cvFilePath, // Store the file path in your schema
    });

    jobApplicationMine
        .save()
        .then(() => {
            res.status(201).json({ message: 'CV info created successfully' });
        })
        .catch((err) =>
            res.status(500).json({ error: 'Failed to create CV info' })
        );
});
    module.exports = router