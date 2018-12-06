var db = require("../models");

module.exports = function(app) {
  /*************************************
   * AVANT HTML ROUTES
   * http://localhost:3000/html/create
   ************************************/
  app.get("/html/create-profile", function(req, res) {
    //var myId = req.params.id;
    console.log("HTMLROUTES.js: ARRIVED IN CREATE PROFILE GET ROUTE");
    res.render("create-profile");
  });
  app.get("/html/add-listing/:id", function(req, res) {
    //var myId = req.params.id;
    console.log("HTMLROUTES.js: ARRIVED IN ADD LISTING GET ROUTE");
    res.render("add-listing");
  });
  /*************************** */
  // Load index page
  app.get("/", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });
  });
  /***************************************
   * THIS SHOULD BE THE LAST ROUTE
   ***************************************/
  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
