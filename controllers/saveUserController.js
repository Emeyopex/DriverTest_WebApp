// saveUserController.js

const express = require('express');
const User = require('../models/data');

const saveUserController = express.Router();

saveUserController.saveUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      licenseNumber,
      age,
      make,
      model,
      year,
      platNumber,
    } = req.body;
    const newUser = new User({
      firstName,
      lastName,
      licenseNumber,
      age,
      car_details: {
        make,
        model,
        year,
        platNumber,
      },
    });
    await newUser.save();
    res.redirect(`/G?licenseNumber=${licenseNumber}`);
  } catch (error) {
    console.error('Error handling the request:', error);
    res.status(500).send('Error handling the request');
  }
};

module.exports = saveUserController;
