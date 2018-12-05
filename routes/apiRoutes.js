var db = require("../models");

module.exports = function(app) {
  /*******************
   * NEW API ROUTES
   ******************/
  // Create a new example
  app.post("/api/create-profile", function(req) {
    console.log("APIROUTES: " + JSON.stringify(req.body));
    db.Artist.create({
      artistName: req.body.artistName,
      email: req.body.artistEmail,
      bio: req.body.artistBio,
      avatarUrl: req.body.artistName
    })
      .then(function() {
        //res.json(data); //pass data to front end
      })
      .catch(function(error) {
        console.log(error);
      });
    //db.Example.create(req.body).then(function(dbExample) {
    //res.json(dbExample);
    //});
  });
  /****************/
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.json(dbExample);
    });
  });
};
