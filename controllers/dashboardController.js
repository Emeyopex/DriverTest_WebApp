// dashboardController.js

const express = require('express');

// Create a router for dashboard-related routes
const dashboardController = express.Router();

// GET route to render the dashboard page
dashboardController.getDashboard = (req, res) => {
  // Get the user type from the session, if available
  let userType = req.session.user ? req.session.user.userType : null;

  // Render the dashboard page with user data and user type
  res.render('dashboard', { user: req.session.user, userType });
};

// Export the dashboard controller
module.exports = dashboardController;
