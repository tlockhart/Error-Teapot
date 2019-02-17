/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
const LocalStrategy = require('passport-local').Strategy;
const db = require('../models');

// eslint-disable-next-line func-names
module.exports = function (passport) {
  passport.serializeUser((user, cb) => {
    cb(null, user);
  });

  passport.deserializeUser((user, cb) => {
    cb(null, user);
  });
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true,
      },
      function (req, username, password, done) {
        db.Users.findOne({
          where: {
            username,
            password,
          },
        })
          .then(user => done(null, user))
          .catch(function (error) {
            return done(
              null,
              false,
              req.flash('login', `login failed: ${error.message}`),
            );
          });
      },
    ),
  );
};
