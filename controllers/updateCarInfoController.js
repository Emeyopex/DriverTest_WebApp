// updateCarInfoController.js

const express = require('express');
const User = require('../models/data');

const updateCarInfoController = express.Router();

updateCarInfoController.updateCarInfo = async (req, res) => {
  try {
    const { make, model, year, licenseNumber } = req.body;
    const user = await User.findOne({ licenseNumber });
    if (!user) {
      return res.status(404).send('User not found');
    }
    user.car_details.make = make;
    user.car_details.model = model;
    user.car_details.year = year;
    await user.save();
    res.redirect('/G');
  } catch (error) {
    console.error('Error updating car information:', error);
    res.status(500).send('Error updating car information');
  }
};

module.exports = updateCarInfoController;
