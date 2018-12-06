// var express = require("express");
// var router = express.Router();
var expressValidator = require("express-validator");
var passport = require("passport");

var db = require("../models");
module.exports = function(app) {
//login routes
    app.get("/login", function(req, res) {
        res.render("login", { title: "LOGIN" });
    });

    app.post('/login', 
    passport.authenticate('local', { 
        successRedirect: '/profile',
        failureRedirect: '/login' }),
    function(req, res) {
      res.redirect('/');
    });

//register routes
  app.get("/register", function(req, res) {
      res.render("registration", { title: "Register to join" });
    });

  app.post("/register", function(req, res) {
    console.log(req.body);
    //express validator checks
    req.checkBody('username', 'Username field cannot be empty.').notEmpty();
    req.checkBody('username', 'Username must be between 4-15 characters long.').len(4, 15);
    req.checkBody('email', 'The email you entered is invalid, please try again.').isEmail();
    req.checkBody('email', 'Email address must be between 4-100 characters long, please try again.').len(4, 100);
    req.checkBody('password', 'Password must be between 8-100 characters long.').len(8, 100);
    req.checkBody('passwordMatch', 'Password must be between 8-100 characters long.').len(8, 100);
    req.checkBody('passwordMatch', 'Passwords do not match, please try again.').equals(req.body.password);

    
    const errors = req.validationErrors();

    if (errors) {
        console.log(`errors:  ${JSON.stringify(errors)}`)
        res.render('register', {
            title: "Registration Error",
            errors: errors
        });
    }

    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;   
    
    
    
    console.log(req.body.username);
    console.log(req.body.email);
    console.log(req.body.password);   

    const database = require('../config/database.js');

    database.query("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", [username, email, password], function(
        error, results, fields) {
            if (error) 
            throw error;
        
        res.render("registration", { title: 'Wubba lubba dub dub...Registered' });
        
        });
    });
app.get("/profile", authenticated, function(req, res) {
    console.log(req.user);
    res.render("profile", { user: req.user.username });
    });
};

function authenticated(req, res, next) {
    if (!req.user) {
    res.redirect('/login');
    } else {
    next();
    }
    }
