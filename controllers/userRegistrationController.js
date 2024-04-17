// userRegistrationController.js
const express = require('express');
const User = require('../models/data');
const userRegistrationController = express.Router();
userRegistrationController.registerUser = async (req, res) => {
  try {
    const { username, password, userType } = req.body;
    const newUser = new User({ username, password, userType });
    await newUser.save();
    return res.redirect('/Login');
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).send('Error registering user');
  }
};

module.exports = userRegistrationController;
