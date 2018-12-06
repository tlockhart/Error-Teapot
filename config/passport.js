var localStrategy = require('passport-local').Strategy;

module.exports = passport => {
    passport.serializeUser(function(user, cb) {
        cb(null, user);
      });
      
      passport.deserializeUser(function(user, cb) {
        // User.findById(id, function(err, user) {
        //   cb(err, user);
        // });
        cb(null, user);
      });
    passport.use(new localStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
        
      },
      function(req, username, password, done) {
        const database = require('../config/database.js');

        database.query(`SELECT * from users WHERE username = "${username}" AND password = "${password}"`, function(
            error, results, fields) {
                if (error) {
                    return done(null, false, req.flash("login", "login failed"))
                }
            
            return done(null, results)
            });
      }
    ));
}