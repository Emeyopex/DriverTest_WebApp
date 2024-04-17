const express = require('express');
const loginController = express.Router();
loginController.getLogin = (req, res) => {
  let userType = req.session.user ? req.session.user.userType : null;
  res.render('login', { userType });
};

module.exports = loginController;
