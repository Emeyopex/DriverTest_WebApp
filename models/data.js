const mongoose = require('mongoose');

mongoose
  .connect('mongodb+srv://xingdazhou:hz614924@cluster.sojikff.mongodb.net/')
  .then(() => {
    console.log('Connected to database');
  })
  .catch((error) => {
    console.error('Error connecting to database:', error);
  });

const appointmentSchema = new mongoose.Schema({
  date: Date,
  time: String,
  isTimeSlotAvailable: { type: Boolean, default: true },
});

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  password: String,
  userType: String,
  licenseNumber: Number,
  age: Number,
  car_details: {
    make: String,
    model: String,
    year: String,
    platNumber: String,
  },
  appointments: [appointmentSchema],
  testType: String,
  comments: String,
  passed: Boolean,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
