// gPageController.js

const express = require('express');
const User = require('../models/data');
const availableTimeSlots = require('./availableTimeSlots');

// Create a router for G page-related routes
const gPageController = express.Router();

// GET route to render the G page
gPageController.getGPage = async (req, res) => {
    // Get the user type from the session
    let userType = req.session.user ? req.session.user.userType : null;

    // Redirect to login if user is not authenticated
    if (!req.session.user) {
        return res.redirect('/Login');
    }

    try {
        const user = req.session.user;

        // Check if the user is authorized as a Driver
        if (user.userType !== 'Driver') {
            return res.status(403).send('Access Forbidden');
        }

        // Render the G page with user data and available time slots
        if (req.query.licenseNumber) {
            const userData = await User.findOneAndUpdate(
                {licenseNumber: req.query.licenseNumber},
                {$setOnInsert: {}},
                {upsert: true, new: true}
            );
            return res.render('gpage', {
                user: userData,
                userType,
                availableTimeSlots,
            });
        }

        res.render('gpage', {user: {}, userType, availableTimeSlots});
    } catch (error) {
        console.error('Error handling the request:', error);
        res.status(500).send('Error handling the request');
    }
};

// Export the gPageController
module.exports = gPageController;
