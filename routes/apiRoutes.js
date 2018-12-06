var db = require("../models");

module.exports = function(app) {
  /*******************
   * NEW API ROUTES
   ******************/
  /************************************************************************************************************* */
  /*****************
   * BURGER ROUTES
   *****************/
  // Create all our routes and set up logic within those routes where required.
  //Browser: localhost:8080/
  /****************************************************
   *  NOTE: hbsObject is global only for error handling
   ****************************************************/
  //var hbsObject;
  app.get("/", function(req, res) {
    /*****************************************
     * If only querying burgers db use below:
     ****************************************/
    /*burger.all(function(data) {
    hbsObject = {
      burgers: data
    };*/
    //console.log("GET: HBSOBJECT = "+JSON.stringify(hbsObject));
    /*res.render("index", hbsObject);
  });*/
    /******************************************/
    //Join Route: For displaying all artifacts for an artist.
    var allArtifacts = db.Artifact.findAll({
      /*Step1 Join artifact and artist tables: Get all artists with artifacts (Join), 
    include foreign key, just artist info that have a foreign key in burgers table.*/
      include: [db.Artist]
    });
    var allArtists = db.Artist.findAll(); //all info from artist table (model)

    Promise.all([allArtifacts, allArtists]) //Step2: get artifacts and artists
      .then(function(data) {
        //If not doing error checks hsbsObject should not be global: 2 of 3
        var hbsObject = {
          //hbsObject = {
          artifacts: data[0], //pass all info about artifacts from allArtifacts object
          artists: data[1] //pass all info about artists from allArtists object
        };
        res.render("index", hbsObject); //render index.hbs and send hbsObject in the body
      });
  });
  /************************************************************************************************************* */
  // New Profile Route: Insert a new profile
  app.post("/api/create-profile", function(req, res) {
    console.log("APIROUTES: " + JSON.stringify(req.body));
    db.Artist.create({
      artistName: req.body.artistName,
      email: req.body.artistEmail,
      bio: req.body.artistBio,
      avatarUrl: req.body.artistName
    })
      .then(function() {
        //res.json(data); //pass data to front end
        res.status(200).send("ok");
        //res.render("add-listing", data);//Can't set header after they are sent
      })
      .catch(function(error) {
        console.log(
          "APIROUTES.js: Validation Error (User Name Taken) = " + error
        );
      });
    //db.Example.create(req.body).then(function(dbExample) {
    //res.json(dbExample);
    //});
  });

  //Artist Query Route: Get information for a particular artist
  app.get("/api/find-artist/:name", function(req, res) {
    db.Artist.findOne({
      where: {
        artistName: req.params.name
      }
    })
      .then(function(dbArtist) {
        console.log("APIROUTES.js: Artist found =" + JSON.stringify(dbArtist));
        res.json(dbArtist);
      })
      .catch(function(error) {
        console.log("APIROUTES.js: find-artist error = " + error);
      });
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
