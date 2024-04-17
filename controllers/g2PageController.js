// g2PageController.js

const express = require('express');
const availableTimeSlots = require('./availableTimeSlots');

// Create a router for G2 page-related routes
const g2PageController = express.Router();

// GET route to render the G2 page
g2PageController.getG2Page = (req, res) => {
    // Get the user type from the session
    let userType = req.session.user ? req.session.user.userType : null;

    // Redirect to login if user is not authenticated
    if (!req.session.user) {
        return res.redirect('/Login');
    }

    // Check if the user is authorized as a Driver
    if (req.session.user.userType !== 'Driver') {
        return res.status(403).send('Access Forbidden');
    }

    // Render the G2 page with license number and available time slots
    if (req.session.user.licenseNumber === 'Default') {
        return res.render('g2page', {
            licenseNumber: '',
            userType,
            availableTimeSlots: [],
        });
    }

    res.render('g2page', {
        licenseNumber: req.session.user.licenseNumber,
        userType,
        availableTimeSlots: availableTimeSlots,
    });
};

// Export the g2PageController
module.exports = g2PageController;
