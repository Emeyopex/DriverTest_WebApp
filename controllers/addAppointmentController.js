// addAppointmentController.js

const express = require('express');
const User = require('../models/data');

const addAppointmentController = express.Router();

// Controller to handle adding an appointment
addAppointmentController.addAppointment = async (req, res) => {
  try {
    // Extract date and time from request body
    const {date, time} = req.body;

    // Check if user is logged in
    const user = req.session.user;
    if (!user) {
      return res.status(401).json({error: 'User not logged in'});
    }

    // Check if the appointment slot is already booked
    const existingAppointment = await User.findOne({
      'appointments.date': date,
      'appointments.time': time,
      'appointments.isTimeSlotAvailable': true,
    });
    if (existingAppointment) {
      return res
          .status(400)
          .json({error: 'This time slot has already been booked'});
    }

    // Add appointment to the user's appointments
    await User.findOneAndUpdate(
        {_id: user._id},
        {
          $push: {
            appointments: {
              date: date,
              time: time,
              isTimeSlotAvailable: true,
            },
          },
        }
    );

    // Redirect back to dashboard after successful appointment addition
    res.redirect('/dashboard');
  } catch (error) {
    console.error('Error adding appointment:', error);
    res.status(500).json({error: 'Server error'});
  }
};

module.exports = addAppointmentController;
