const setUserStatus = (req, res, next) => {
  res.locals.userLoggedIn = req.session.user ? true : false;
  res.locals.userType = req.session.user ? req.session.user.userType : null;
  next();
};

module.exports = { setUserStatus };
