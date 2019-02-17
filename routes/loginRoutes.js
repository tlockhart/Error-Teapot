/* eslint-disable consistent-return */
/* eslint-disable indent */
// var express = require("express");
// var router = express.Router();
// var expressValidator = require("express-validator");
const passport = require('passport');

const db = require('../models');

module.exports = (app) => {
  /** ***********************************************************
   * ROUTE1: LOGIN-ROUTE
   * CALLED BY: MYSTORE BUTTON IN THE MAIN.HANDLEBARS FILE
   * PURPOSE: RENDER THE LOGIN PAGE AND DISPLAY THE TITLE
   * RENDER: LOGIN PAGE
   ************************************************************* */
  app.get('/login', (req, res) => {
    res.render('login', { title: 'LOGIN' });
  });

  /** ***********************************************************
   * ROUTE2: PASSPORT-AUTHENTICATION-ROUTE
   * CALLED BY: THE SUBMIT BUTTON ON THE LOGIN PAGE
   * PURPOSE: ON BTN CLICK, PASSPORT VERIFIES THE CREDENTIALS
   * ARE IN THE DATABASE AND REDIRECTS THE PAGE TO THE SUCCESS
   * OR FAILURE URL.
   * REDIRECT: SUCCESS OR FAILURE URL
   ************************************************************* */
  app.post(
    '/login',
    passport.authenticate('local', {
      successRedirect: '/profile?success=true',
      failureRedirect: '/login?error=authentication',
    }),
  );

  /** ***********************************************************
   * ROUTE3: REGISTER-ROUTE
   * CALLED BY: GET STARTED BUTTON IN THE MAIN.HANDLEBARS FILE
   * PURPOSE: RENDER THE REGISTER PAGE AND DISPLAY THE TITLE
   * RENDER: REGISTRATION PAGE
   ************************************************************* */
  app.get('/register', (req, res) => {
    res.render('registration', { title: 'Register to join' });
  });

  /** ***********************************************************
   * ROUTE4: REGISTER-INPUT-VALIDATION
   * CALLED BY: THE SUBMIT PAGE ON THE REGISTER PAGE
   * PURPOSE: VALIDATE THE DATED SUBMITTED IN THE FORM.  RERENDERS
   * THE REGISTRATION PAGE UNTILL THE CREDENTIALS ARE CORRECT.
   * RENDER: REGISTRATION PAGE
   ************************************************************* */
  app.post('/register', (req, res) => {
    // console.log(req.body);
    // express validator checks
    req.checkBody('username', 'Username field cannot be empty.').notEmpty();
    req
      .checkBody('username', 'Username must be between 4-15 characters long.')
      .len(4, 15);
    req
      .checkBody('email', 'The email you entered is invalid, please try again.')
      .isEmail();
    req
      .checkBody(
        'email',
        'Email address must be between 4-100 characters long, please try again.',
      )
      .len(4, 100);
    req
      .checkBody('password', 'Password must be between 8-100 characters long.')
      .len(8, 100);
    req
      .checkBody(
        'passwordMatch',
        'Password must be between 8-100 characters long.',
      )
      .len(8, 100);
    req
      .checkBody('passwordMatch', 'Passwords do not match, please try again.')
      .equals(req.body.password);

    const errors = req.validationErrors();

    // DISPLAYS ERRORS IF ANY ARE FOUND:
    if (errors) {
      let nameMsg = '';
      let emailMsg = '';
      let pwdMsg = '';
      for (let i = 0; i < errors.length; i += 1) {
        switch (errors[i].param) {
          case 'username':
            nameMsg = errors[i].msg;
            break;
          case 'email':
            emailMsg = errors[i].msg;
            break;
          case 'password':
            pwdMsg = errors[i].msg;
            break;
          default:
        } // switch
      } // for
      const errorObj = {
        title: 'Register to join',
        user: nameMsg,
        email: emailMsg,
        password: pwdMsg,
      };
      return res.render('registration', errorObj);
  } // if

    const { username } = req.body;
    const { email } = req.body;
    const { password } = req.body;

    /* console.log(req.body.username);
    console.log(req.body.email);
    console.log(req.body.password); */

    /** *****************************************************
     * ARTIST-TABLE-INSERT-QUERY:
     * PURPOSE: INSERTS CREDENTIALS RECEIVED FROM THE RESULTS
     * OF THE USER TABLE INSERT TO KEEP BOTH TABLES IN SYNC.
     * ***************************************************** */
    // INSERT USERNAME AND EMAIL INTO ARTIST TABLE TO SYNC THEM
    function artistTableInsert() {
      db.Artist.create({
        artistName: username,
        email,
        bio: '',
        avatarUrl: '',
      });
    } // artistTable

    /** **************************************************
     * USER-TABLE-INSERT-QUERY:
     * PURPOSE: INSERTS CREDENTIALS RECEIVED FROM THE
     * REGISTER PAGE AND INSERTS THEM INTO THE USER TABLE.
     * REDIRECT: DISPLAY-PROFILE
     * ************************************************* */
    db.Users.create({
      username,
      email,
      password,
    })
      .then((user) => {
        // console.log("DATA = " + JSON.stringify(user, null, 2));
        artistTableInsert();
        res.redirect(`/display-profile?id=${user.id}`);
      }) // then
      // eslint-disable-next-line no-unused-vars
      .catch((error) => {
        /* console.log(
          "LOGINROUTES.js: NEW USER COULD NOT BE INSERTED INTO USER TABLE = " +
            error
        ); //console */
      }); // catch
  }); // Register Post

  function authenticated(req, res, next) {
    // console.log("authenticated " + req.user.username);
    if (!req.user) {
      res.redirect('/login');
    } else {
      next();
    } // ELSE
  } // AUTHENTICATED

  // *************************************************************
  // * ROUTE5: PERMIT-ENTRY
  // * CALLED BY: THE SUBMIT PAGE ON THE REGISTER PAGE
  // * PURPOSE: CALLS AUTHENTICATED FUNCTION TO DETERMINE IF A USER
  // * HAS BEEN AUTHENTICATED. IF SO, IT REDIRECTS THE USER TO THEIR
  // * PROFILE PAGE.
  // * REDIRECT: DISPLAY-PROFILE
  // **************************************************************
  app.get('/profile', authenticated, (req, res) => {
    res.redirect(`/display-profile?id=${req.user.id}`);
  });
  /** *************************************************
   * HTML ROUTE6: DISPLAY 404 FOR UNKNOWN ROUTES
   * NOTE: THIS SHOULD BE THE LAST ROUTE
   * PURPOSE: Render 404 page for any unmatched routes
   * RENDER: 404 ERROR PAGE
   ************************************************** */
  app.get('*', (req, res) => {
    res.render('404');
  });
}; // module exports
