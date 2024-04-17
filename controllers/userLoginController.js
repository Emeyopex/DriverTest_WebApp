// userLoginController.js

const express = require('express');
const User = require('../models/data');

const userLoginController = express.Router();

userLoginController.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send('User not found');
    }
    if (user.password !== password) {
      return res.status(401).send('Invalid password');
    }
    req.session.user = user;
    res.redirect('/Dashboard');
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).send('Error logging in user');
  }
};

module.exports = userLoginController;
