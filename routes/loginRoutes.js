// var express = require("express");
// var router = express.Router();
// var expressValidator = require("express-validator");
var passport = require("passport");

var db = require("../models");
module.exports = function(app) {
  //login routes
  app.get("/login", function(req, res) {
    res.render("login", { title: "LOGIN" });
  });

  app.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/profile?success=true",
      failureRedirect: "/login?error=authentication"
    })
  );

  //register routes
  app.get("/register", function(req, res) {
    res.render("registration", { title: "Register to join" });
  });

  app.post("/register", function(req, res) {
    console.log(req.body);
    //express validator checks
    req.checkBody("username", "Username field cannot be empty.").notEmpty();
    req
      .checkBody("username", "Username must be between 4-15 characters long.")
      .len(4, 15);
    req
      .checkBody("email", "The email you entered is invalid, please try again.")
      .isEmail();
    req
      .checkBody(
        "email",
        "Email address must be between 4-100 characters long, please try again."
      )
      .len(4, 100);
    req
      .checkBody("password", "Password must be between 8-100 characters long.")
      .len(8, 100);
    req
      .checkBody(
        "passwordMatch",
        "Password must be between 8-100 characters long."
      )
      .len(8, 100);
    req
      .checkBody("passwordMatch", "Passwords do not match, please try again.")
      .equals(req.body.password);

    var errors = req.validationErrors();

    if (errors) {
      console.log("errors = ", JSON.stringify(errors, null, 2));
      // res.render('register', {
      //     title: "Registration Error",
      //     errors: errors
      // });
      //return res.redirect("/html/create-profile?error=an-error-occurred");
      var nameMsg = "";
      var emailMsg = "";
      var pwdMsg = "";
      for (var i = 0; i < errors.length; i++) {
        switch (errors[i].param) {
          case "username":
            nameMsg = errors[i].msg;
            break;
          case "email":
            emailMsg = errors[i].msg;
            break;
          case "password":
            pwdMsg = errors[i].msg;
            break;
          default:
        } //switch
      } //for
      errorObj = {
        title: "Register to join",
        user: nameMsg,
        email: emailMsg,
        password: pwdMsg
      };
      //return res.redirect("/display-profile?error=an-error-occurred", errorObj);
      return res.render("registration", errorObj);
    }

    var username = req.body.username.replace(/\s/g,'');
    var email = req.body.email;
    var password = req.body.password.replace(/\s/g,'');

    console.log(req.body.username);
    console.log(req.body.email);
    console.log(req.body.password);
    // toDO:  move this to the top of the file

    /*database.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, password],
      function(error, results) {
        if (error) {
          throw error;
        }

        // res.render("registration", { title: 'Wubba lubba dub dub...Registered' });
        // res.redirect("/html/create-profile?username=" + username);

        res.redirect("/html/create-profile?id=" + results.insertId);
      }
    );*/
    //Insert username and email into artist table to keep them in sync
    function artistTableInsert() {
      db.Artist.create({
        artistName: username,
        email: email,
        bio: " ",
        avatarUrl: " "
      });
    }

    //INSERT QUERY:
    db.Users.create({
      username: username,
      email: email,
      password: password
    })
      .then(function(user) {
        console.log("DATA = " + JSON.stringify(user, null, 2));
        artistTableInsert();

        //res.redirect("/html/create-profile?id=" + user.id);
        res.redirect("/display-profile?id=" + user.id);
      }) //then
      .catch(function(error) {
        console.log(
          "LOGINROUTES.js: NEW USER COULD NOT BE INSERTED INTO USER TABLE = " +
            error
        ); //console
      }); //catch
  }); //findOne

  app.get("/profile", authenticated, function(req, res) {
    console.log("username: ", req.user);
    res.render("profile", { user: req.user.username });
  });
  /***************************************************
   * HTML ROUTE4: DISPLAY 404 FOR UNKNOWN ROUTES
   * NOTE: THIS SHOULD BE THE LAST ROUTE
   * PURPOSE: Render 404 page for any unmatched routes
   ***************************************************/
  app.get("*", function(req, res) {
    res.render("404");
  });
}; //module exports

function authenticated(req, res, next) {
  console.log("authenticated");
  if (!req.user) {
    res.redirect("/login");
  } else {
    next();
  }
}
