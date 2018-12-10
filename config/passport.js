var db = require("../models");

var localStrategy = require("passport-local").Strategy;

module.exports = function(passport) {
  passport.serializeUser(function(user, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function(user, cb) {
    // User.findById(id, function(err, user) {
    //   cb(err, user);
    // });
    cb(null, user);
  });
  passport.use(
    new localStrategy(
      {
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true
      },
      function(req, username, password, done) {
        db.Users.findOne({
          where: {
            username: username,
            password: password
          }
        })
          .then(function(user) {
            /*console.log("***********************************");
            console.log("PASSPORT: USERNAME = " + user.username);
            console.log("PASSPORT: id = " + user.id);
            console.log("************************************");*/
            return done(null, user);
          })
          .catch(function(error) {
            return done(
              null,
              false,
              req.flash("login", "login failed: " + error.message)
            );
          });
      }
    )
  );
};
