/* eslint-disable indent */
// var express = require("express");
// var router = express.Router();
// var expressValidator = require("express-validator");
var passport = require("passport");

var db = require("../models");
module.exports = function(app) {
  /*************************************************************
   * ROUTE1: LOGIN-ROUTE
   * CALLED BY: MYSTORE BUTTON IN THE MAIN.HANDLEBARS FILE
   * PURPOSE: RENDER THE LOGIN PAGE AND DISPLAY THE TITLE
   * RENDER: LOGIN PAGE
   **************************************************************/
  app.get("/login", function(req, res) {
    res.render("login", { title: "LOGIN" });
  });

  /*************************************************************
   * ROUTE2: PASSPORT-AUTHENTICATION-ROUTE
   * CALLED BY: THE SUBMIT BUTTON ON THE LOGIN PAGE
   * PURPOSE: ON BTN CLICK, PASSPORT VERIFIES THE CREDENTIALS
   * ARE IN THE DATABASE AND REDIRECTS THE PAGE TO THE SUCCESS
   * OR FAILURE URL.
   * REDIRECT: SUCCESS OR FAILURE URL
   **************************************************************/
  app.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/profile?success=true",
      failureRedirect: "/login?error=authentication"
    })
  );

  /*************************************************************
   * ROUTE3: REGISTER-ROUTE
   * CALLED BY: GET STARTED BUTTON IN THE MAIN.HANDLEBARS FILE
   * PURPOSE: RENDER THE REGISTER PAGE AND DISPLAY THE TITLE
   * RENDER: REGISTRATION PAGE
   **************************************************************/
  app.get("/register", function(req, res) {
    res.render("registration", { title: "Register to join" });
  });

  /*************************************************************
   * ROUTE4: REGISTER-INPUT-VALIDATION
   * CALLED BY: THE SUBMIT PAGE ON THE REGISTER PAGE
   * PURPOSE: VALIDATE THE DATED SUBMITTED IN THE FORM.  RERENDERS
   * THE REGISTRATION PAGE UNTILL THE CREDENTIALS ARE CORRECT.
   * RENDER: REGISTRATION PAGE
   **************************************************************/
  app.post("/register", function(req, res) {
    //console.log(req.body);
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

    //DISPLAYS ERRORS IF ANY ARE FOUND:
    if (errors) {
      //console.log("errors = ", JSON.stringify(errors, null, 2));
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

    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;

    /*console.log(req.body.username);
    console.log(req.body.email);
    console.log(req.body.password);*/

    /*******************************************************
     * ARTIST-TABLE-INSERT-QUERY:
     * PURPOSE: INSERTS CREDENTIALS RECEIVED FROM THE RESULTS
     * OF THE USER TABLE INSERT TO KEEP BOTH TABLES IN SYNC.
     * ******************************************************/
    //INSERT USERNAME AND EMAIL INTO ARTIST TABLE TO SYNC THEM
    function artistTableInsert() {
      db.Artist.create({
        artistName: username,
        email: email,
        bio: "",
        avatarUrl: ""
      });
    }

    /****************************************************
     * USER-TABLE-INSERT-QUERY:
     * PURPOSE: INSERTS CREDENTIALS RECEIVED FROM THE
     * REGISTER PAGE AND INSERTS THEM INTO THE USER TABLE.
     * REDIRECT: DISPLAY-PROFILE
     * **************************************************/
    db.Users.create({
      username: username,
      email: email,
      password: password
    })
      .then(function(user) {
        //console.log("DATA = " + JSON.stringify(user, null, 2));
        artistTableInsert();
        res.redirect("/display-profile?id=" + user.id);
      }) //then
      // eslint-disable-next-line no-unused-vars
      .catch(function(error) {
        /*console.log(
          "LOGINROUTES.js: NEW USER COULD NOT BE INSERTED INTO USER TABLE = " +
            error
        ); //console*/
      }); //catch
  }); //Register Post
  /*************************************************************
   * ROUTE5: PERMIT-ENTRY
   * CALLED BY: THE SUBMIT PAGE ON THE REGISTER PAGE
   * PURPOSE: CALLS AUTHENTICATED FUNCTION TO DETERMINE IF A USER
   * HAS BEEN AUTHENTICATED. IF SO, IT REDIRECTS THE USER TO THEIR
   * PROFILE PAGE.
   * REDIRECT: DISPLAY-PROFILE
   **************************************************************/
  app.get("/profile", authenticated, function(req, res) {
    /*console.log("*************************************************");
    console.log("LOGINGROUTES: username: ", req.user);
    console.log("**************************************************");*/
    //res.render("profile", { user: req.user.username }); pass the username
    //res.render("profile", { user: req.user.id }); //pass the id
    res.redirect("/display-profile?id=" + req.user.id);
  });
  /***************************************************
   * HTML ROUTE6: DISPLAY 404 FOR UNKNOWN ROUTES
   * NOTE: THIS SHOULD BE THE LAST ROUTE
   * PURPOSE: Render 404 page for any unmatched routes
   * RENDER: 404 ERROR PAGE
   ***************************************************/
  app.get("*", function(req, res) {
    res.render("404");
  });
}; //module exports

function authenticated(req, res, next) {
  //console.log("authenticated " + req.user.username);
  if (!req.user) {
    res.redirect("/login");
  } else {
    next();
  } //ELSE
} //AUTHENTICATED
