const express = require('express');
const logoutController = express.Router();

logoutController.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).send('Error logging out');
        }
        res.redirect('/dashboard');
    });
};

module.exports = logoutController;
