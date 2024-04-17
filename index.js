const express = require('express');
const path = require('path');
const ejs = require('ejs');
const session = require('express-session');

// Import controllers
const navbarController = require('./controllers/navbarController');
const dashboardController = require('./controllers/dashboardController');
const gPageController = require('./controllers/gPageController');
const g2PageController = require('./controllers/g2PageController');
const loginController = require('./controllers/loginController');
const userRegistrationController = require('./controllers/userRegistrationController');
const userLoginController = require('./controllers/userLoginController');
const saveUserController = require('./controllers/saveUserController');
const updateCarInfoController = require('./controllers/updateCarInfoController');
const addAppointmentController = require('./controllers/addAppointmentController');
const examinerController = require('./controllers/examinerController');
const logoutController = require('./controllers/logoutController');
const adminController = require('./controllers/adminController');
const updateexaminerController = require('./controllers/updateexaminerController');

const app = express();

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine to EJS
app.set('view engine', 'ejs');

// Configure session middleware
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
  })
);

// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// Middleware to set local variables
app.use((req, res, next) => {
  res.locals.userLoggedIn = req.session.user ? true : false;
  res.locals.userType = req.session.user ? req.session.user.userType : null;
  next();
});

// Define routes
app.get('/navbar', navbarController.getNavbar);
app.get('/', dashboardController.getDashboard);
app.get('/dashboard', dashboardController.getDashboard);
app.get('/G', gPageController.getGPage);
app.get('/G2', g2PageController.getG2Page);
app.get('/Login', loginController.getLogin);
app.post('/register', userRegistrationController.registerUser);
app.post('/login', userLoginController.loginUser);
app.post('/saveUser', saveUserController.saveUser);
app.post('/update-car-info', updateCarInfoController.updateCarInfo);
app.post('/addAppointment', addAppointmentController.addAppointment);
app.get('/examiner', examinerController.getExaminer);
app.get('/logout', logoutController.logout);
app.get('/appointment', adminController.getAdmin);
app.post('/updateDriverStatus', updateexaminerController.updateexaminer);

// Start the server
app.listen(4000, () => {
  console.log('Application link: http://localhost:4000');
});
