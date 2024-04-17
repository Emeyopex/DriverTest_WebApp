const express = require('express');
const navbarController = express.Router();
navbarController.getNavbar = (req, res) => {
  let userType = req.session.user ? req.session.user.userType : null;
  res.render('navbar', { userType });
};
module.exports = navbarController;
