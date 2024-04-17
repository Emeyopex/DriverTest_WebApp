// examinerController.js

const express = require('express');
const User = require('../models/data');

// Create a router for examiner-related routes
const examinerController = express.Router();

// GET route to render the examiner page
examinerController.getExaminer = async (req, res) => {
    try {
        // Redirect to login if user is not authenticated
        if (!req.session.user) {
            return res.redirect('/login');
        }

        // Check if the user is authorized as an Examiner
        if (req.session.user.userType !== 'Examiner') {
            return res.status(403).send('Access Forbidden');
        }

        // Find available appointments
        const appointments = await User.find({
            'appointments.isTimeSlotAvailable': true,
        });

        // Find all drivers
        const drivers = await User.find({userType: 'Driver'});

        // Render the examiner page with appointment and driver data
        res.render('examiner', {appointments, drivers});
    } catch (error) {
        // Handle errors
        console.error('Error handling the request:', error);
        res.status(500).send('Error handling the request');
    }
};

// Export the examiner controller
module.exports = examinerController;
