// adminController.js

const express = require('express');
const User = require('../models/data');

const adminController = express.Router();

// Controller to render the admin page with passed and failed candidates
adminController.getAdmin = async (req, res) => {
    try {
        // Find candidates who passed the test
        const passedCandidates = await User.find({passed: true});

        // Find candidates who failed the test
        const failedCandidates = await User.find({passed: false});

        // Render the admin page with passed and failed candidates
        res.render('appointment', {passedCandidates, failedCandidates});
    } catch (error) {
        console.error('Error handling the request:', error);
        res.status(500).send('Error handling the request');
    }
};

module.exports = adminController;
