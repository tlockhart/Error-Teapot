var db = require("../models");

module.exports = function(app) {
  /*************************************
   * AVANT HTML ROUTES
   * http://localhost:3000/html/create
   ************************************/
  /**********************************************************
   * HTML ROUTE1: DISPLAY-PROFILE
   * CALLED-BY: LOGINROUTES.JS 3 TIMES
   * PURPOSE: TO PASS USER ID TO QUERY THE USER TABLE,
   * IN ORDER TO PRE-POPULATE THE USERNAME AND EMAIL
   * ADDRESS IN THE CREATE-PROFILE PAGE
   * REDIRECT: NONE
   ***********************************************************/
  //app.get("/html/create-profile", function(req, res) {
  app.get("/display-profile", function(req, res) {
    //var myId = req.params.id;
    var id = req.query.id;
    console.log("HTML ROUTES : id = " + id);
    db.Users.findOne({
      where: {
        id: id
      }
    })
      .then(function(artistLogin) {
        return res.render("create-profile", {
          login: {
            name: artistLogin.username,
            email: artistLogin.email
          }
        }); //res render
      }) //inner then
      .catch(function(error) {
        console.log(
          "HTMLROUTES.js: Could not find a matching artist for that userId = " +
            error
        ); //console
      }); //catch
  });
  /*********************************************
   * HTML ROUTE2: DISPLAY-ADD-LISTING
   * CALLED BY: CREATE-PROFILE.JS
   * PURPOSE: DISPLAY THE ADD-LISTING PAGE AND
   * PASS THE USER ID TO BE INSERTED IN THE
   * ARTIFACTS TABLE AS A FOREIGN KEY.
   * REDIRECT: NONE
   *********************************************/
  //app.get("/html/add-listing/:id", function(req, res) {
  app.get("/display-add-listing/:id", function(req, res) {
    var passedId = req.params.id;
    console.log("***********************************************");
    console.log("HTMLROUTES.js:  ADD-LISTING GET ROUTE " + passedId);
    console.log("***********************************************");
    res.render("add-listing", { id: passedId }); //pass value in the body
  });
  /*********************************************
   * HTML ROUTE3: LOAD INDEX.HANDLEBARS PAGE
   * CALLED BY: URL
   * PURPOSE: DISPLAY THE ARTIST SEARCH PAGE
   * REDIRECT: iNDEX.HANDLEBARS
   *********************************************/
  app.get("/", function(req, res) {
    //db.Example.findAll({}).then(function(dbExamples) {
    res.render(
      "index"
    ); /*, {
        msg: "Welcome!",
        examples: dbExamples*/
    //});
  }); //GET
  // });
  /*************************************NOTE USED******************************/

  /* Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });
  });*/
}; //MODULE EXPORTS
