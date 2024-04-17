const express = require('express');
const User = require('../models/data');

const updateexaminerController = express.Router();

updateexaminerController.updateexaminer = async (req, res) => {
    try {
        // Iterate over request body to update driver status
        for (const [key, value] of Object.entries(req.body)) {
            // Check if the key starts with 'status_'
            if (key.startsWith('status_')) {
                const driverId = key.substring(7); // Extract driver ID from key
                const passed = value === 'on'; // Check if the checkbox is checked
                await User.findByIdAndUpdate(driverId, {passed});
            } else if (key.startsWith('selected_')) {
                const driverId = key.substring(9); // Extract driver ID from key
                const selected = value === 'on'; // Check if the driver is selected
                // Handle the case where the driver is not selected
                if (!selected) {
                    await User.findByIdAndUpdate(driverId, {passed: false});
                }
            }
        }
        res.redirect('/examiner'); // Redirect back to the examiner view
    } catch (error) {
        console.error('Error updating driver status:', error);
        res.status(500).send('Error updating driver status');
    }
};

module.exports = updateexaminerController;
