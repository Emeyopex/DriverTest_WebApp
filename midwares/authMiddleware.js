// authMiddleware.js

const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/Login');
  }
};

module.exports = { isAuthenticated };

// setUserStatus.js
