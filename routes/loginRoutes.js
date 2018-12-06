// var express = require("express");
// var router = express.Router();
var db = require("../models");
module.exports = function(app) {
  app.get("/register", function(req, res) {
      res.render("registration");
    });

  app.post("/register", function(req, res) {
      console.log(req.body.username);
    console.log(req.body.email);
    console.log(req.body.password);   

    const database = require('../config/database.js');

    // db.query('INSERT INTO users')
    res.render("registration");
    });
};
