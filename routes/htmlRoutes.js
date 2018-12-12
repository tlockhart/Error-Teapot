/* eslint-disable no-unused-vars */
var db = require("../models");

module.exports = function(app) {
  /**********************************************************
   * HTML ROUTE6: DISPLAY-PROFILE
   * CALLED-BY: LOGINROUTES.JS 3 TIMES
   * PURPOSE: TO PASS USER ID TO QUERY THE USER TABLE,
   * IN ORDER TO PRE-POPULATE THE USERNAME AND EMAIL
   * ADDRESS IN THE CREATE-PROFILE PAGE
   * RENDER: NONE
   ***********************************************************/
  //app.get("/html/create-profile", function(req, res) {
  app.get("/display-profile", function(req, res) {
    var id = req.query.id;
    //console.log("HTML ROUTES : id = " + id);
    db.Artist.findOne({
      where: {
        id: id
      }
    })
      .then(function(artistLogin) {
        return res.render("create-profile", {
          login: {
            name: artistLogin.artistName,
            email: artistLogin.email,
            bio: artistLogin.bio,
            avatar: artistLogin.avatarUrl
          }
        }); //res render
      }) //inner then
      // eslint-disable-next-line no-unused-vars
      .catch(function(error) {
        /*console.log(
          "HTMLROUTES.js: Could not find a matching artist for that userId = " +
            error
        ); //console*/
      }); //catch
  });
  /*********************************************
   * HTML ROUTE7: DISPLAY-ADD-LISTING
   * CALLED BY: CREATE-PROFILE.JS
   * PURPOSE: DISPLAY THE ADD-LISTING PAGE AND
   * PASS THE USER ID TO BE INSERTED IN THE
   * ARTIFACTS TABLE AS A FOREIGN KEY.
   * RENDER: ADD-LISTING
   *********************************************/
  //app.get("/html/add-listing/:id", function(req, res) {
  app.get("/display-add-listing/:id", function(req, res) {
    var passedId = req.params.id;
    /*console.log("***********************************************");
    console.log("HTMLROUTES.js:  ADD-LISTING GET ROUTE " + passedId);
    console.log("***********************************************");*/
    res.render("add-listing", { id: passedId }); //pass value in the body
  });
  /*********************************************
   * HTML ROUTE8: LOAD INDEX.HANDLEBARS PAGE
   * CALLED BY: URL
   * PURPOSE: DISPLAY THE ARTIST SEARCH PAGE
   * REDIRECT: iNDEX.HANDLEBARS
   *********************************************/
  app.get("/", function(req, res) {
    res.render("index");
  }); //GET
}; //MODULE EXPORTS
