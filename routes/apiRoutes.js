/* eslint-disable no-unused-vars */
var db = require("../models");

module.exports = function(app) {
  /*var artistSessionId;
  var artistSessionName;*/

  /**************************************************************
   * DATA PASS ROUTE1: UPDATE-PROFILE
   * CALLED-BY: CREATE-PROFILE.JS
   * PURPOSE: TO UPDATE THE BIO AND AVATAR OF A NEW USER PROFILE
   * IN THE ARTIST TABLE.
   * REDIRECT: TO ADD-LISTING PAGE.
   ***************************************************************/
  //app.put("/api/create-profile", function(req, res) {
  app.put("/update-profile", function(req, res) {
    /*console.log("****************************");
    console.log("APIROUTEs PROFILE TO INSERT " + JSON.stringify(req.body));
    console.log("APIROUTEs PROFILE NAME" + req.body.artistName);
    console.log("****************************");*/
    db.Artist.update(
      {
        /****************************************
         * DATA PASSED IN FROM CREATE-PROFILE FORM
         ****************************************/
        //artistName: req.body.artistName,
        // email: req.body.artistEmail,
        bio: req.body.artistBio,
        avatarUrl: req.body.artistAvatar
      },
      {
        where: {
          artistName: req.body.artistName
        }
      }
    )
      .then(function() {
        res.status(200).send("ok");
      })
      // eslint-disable-next-line prettier/prettier
      .catch(function( error ) {
        //console.log("APIROUTES.js: Could not insert new profile = " + error);
      });
  });
  /**************************************************************
   * DATA PASS ROUTE2: RETRIEVE-ID
   * CALLED-BY: CREATE-PROFILE.JS
   * PURPOSE: RETURNS THE ARTIST'S ID FROM THE ARTIST TABLE,
   * BASED ON HIS USER NAME, WHICH IS PASSED IN AS A NAME PARAMATER
   * REDIRECT: NONE
   ***************************************************************/
  //app.get("/api/artist-id/:name", function(req, res) {
  app.get("/retrieve-id/:name", function(req, res) {
    var artistSessionName = req.params.name;
    /* console.log("**********************************");
    console.log("Name = " + artistSessionName);*/
    db.Artist.findOne({
      where: {
        artistName: artistSessionName
      }
    })
      .then(function(artistInfo) {
        /*console.log(
          "APIROUTES.js: GET - Artist SESSION Data = " +
            JSON.stringify(artistInfo)
        );*/
        //return a json object
        res.json(artistInfo);
      })
      .catch(function(error) {
        /*console.log(
          "APIROUTES.js: Could not find artist ID by user name error = " + error
        );*/
      }); //catch
  }); //Artist-ID
  /**************************************************************
   * DATA PASS ROUTE3: ADD-NEW-LISTING
   * CALLED-BY: ADD-LISTING.JS
   * PURPOSE: PULLS THE ARTIST ID FROM THE HTML PAGE TO INSERT AS
   * A FOREIGN KEY IN THE ARTIFACT TABLE, ALONG WITH FORM DATA,
   * WHEN THE CREATE-LISTING-BTN IS CLICKED
   * REDIRECT: NONE
   ***************************************************************/
  //app.post("/api/add-listing/:id", function(req, res) {
  app.post("/add-new-listing/:id", function(req, res) {
    var artistId = req.params.id;
    /*console.log(
      "APIROUTES api/add-listing POST ROUTE- INSERT ARTIFACT ID: " + artistId
    );
    console.log("********************************************************");
    console.log("APIROUTES: " + JSON.stringify(req.body));*/
    db.Artifact.create({
      title: req.body.artifactTitle,
      thumbImgUrl: req.body.artifactThumbImg,
      fullImgUrl: req.body.artifactFullImg,
      price: req.body.artifactPrice,
      ArtistId: artistId
    })
      .then(function() {
        //res.json(data); //pass data to front end
        res.status(200).send("ok");
      })
      .catch(function(error) {
        /*console.log(
          "APIROUTES.js: Could not post data to the artifacts table: error = " +
            error
        );*/
      });
  });

  /****************************************************************
   * DATA PASS ROUTE4: DISPLAY-STORE-FRONT
   * CALLED-BY: VIEW-STORE-FRONT.JS WHEN THE VIEW-GALLERY-BTN IS CLICKED
   * PURPOSE: PULLS THE ARTIST ID FROM THE HTML PAGE TO INSERT AS
   * A FOREIGN KEY IN THE ARTIFACT TABLE, ALONG WITH FORM DATA
   * REDIRECT: STORE-FRONT
   *****************************************************************/
  //app.get("/api/store-front/:id", function(req, res) {
  app.get("/display-store-front/:id", function(req, res) {
    var id = req.params.id;
    db.Artist.findOne({
      where: {
        id: id
      }
    })
      .then(function(objArtist) {
        db.Artifact.findAll({
          where: {
            // ArtistId: artist.id
            ArtistId: id
          }
        }).then(function(arrArtifacts) {
          var data = {
            artist: {
              name: objArtist.artistName,
              email: objArtist.email,
              bio: objArtist.bio,
              avatar: objArtist.avatarUrl
            },
            artifacts: arrArtifacts
          }; //data
          //console.log("STOREFRONT DATA =" + JSON.stringify(data));
          return res.render("store-front", data); //res render
        }); //inner then
      }) //outer then
      .catch(function(error) {
        /*console.log(
          "APIROUTES.js: Could not find artist ID in the Artist/Artifacts table : error = " +
            error
        );*/
      }); //catch
  }); //StoreFront
  /****************************************************************
   * DATA PASS ROUTE5: DISPLAY-ARTIST-STORE
   * CALLED-BY: FIND-ARTIST.JS WHEN THE ARTIST-SEARCH-BTN IS CLICKED
   * PURPOSE: DISPLAYS THE ARTIST'S STORE FRONT
   * REDIRECT: STORE-FRONT
   *****************************************************************/
  //app.get("/api/store-front/:id", function(req, res) {
  app.get("/display-user-store/:name", function(req, res) {
    var name = req.params.name;
    db.Artist.findOne({
      where: {
        artistName: name
      }
    })
      .then(function(objArtist) {
        db.Artifact.findAll({
          where: {
            // ArtistId: artist.id
            ArtistId: objArtist.id
          }
        })
          .then(function(arrArtifacts) {
            var data = {
              artist: {
                name: objArtist.artistName,
                email: objArtist.email,
                bio: objArtist.bio,
                avatar: objArtist.avatarUrl
              },
              artifacts: arrArtifacts
            }; //data
            //console.log("STOREFRONT DATA =" + JSON.stringify(data));
            return res.render("store-front", data); //res render
          }) //inner then
          .catch(function(error) {
            return res.render("index");
            /*console.log(
            "APIROUTES.js: No Artist Found, no matching ArtistId in Artifact table, can't display page - " +
              error
          );*/
          });
      }) //outer then
      .catch(function(error) {
        return res.render("index");
        /*console.log(
          "APIROUTES.js: No Artist Found, no matching ArtistId in Artifact table, can't display page - " +
            error
        );*/
      });
  });
}; //StoreFront
/************************************************NOT USED***************************************************/
//12/08: MOVED TO HTMLROUTES: Route3: Get username and email by artistId
//app.get("/api/artist-log", function(req, res) {
/*app.get("/api/artist-log", function(req) {
  var id = req.query.id;
  console.log("****************************");
  console.log("APIROUTES ID = " + id);
  console.log("****************************");
});*/
/****************************************************
 * TRASH CODE: NOT STATELESS
 ****************************************************/
//Route4: Get and Store the artist Id to the backend
/*************************************************/
/*app.post("/api/store-id/", function(req, res) {
  var id = req.body.artistId;
  console.log("APIROUTES - NEW ADD-LISTING Id=" + id);
  //res.redirect('/api/add-listing/'+id);
  artistSessionId = id;
  //REQUIRED:YOU MUST SEND A STATUS OK MESSAGE FROM A POST METHOD FOR THE NEXT PAGE TO RENDER
  res.status(200).send("ok");
  //res.json(id);
});*/

//ROUTE:7 After stored from profile, get artist name stored in artistSessionName
/*app.get("/api/artist-session-name", function(req, res) {
  var artistName = artistSessionName;
  res.json(artistName);
}); //Artist-ID*/

//ROUTE8: After stored form profile, get artist id stored in artistSessionID
/*app.get("/api/artist-session-id", function(req, res) {
  var artistId = artistSessionId;
  res.json(artistId);
}); //Artist-ID*/
/************************************************************************* */
//NOT WIRED YET:Artist Query Route: Get information for a particular artist
/************************************************************************* */
/*app.get("/api/artist-name/:name", function(req, res) {
  db.Artist.findOne({
    where: {
      artistName: req.params.name
    }
  })
    .then(function(dbArtist) {
      console.log("APIROUTES.js: Artist found =" + JSON.stringify(dbArtist));
      //res.json(dbArtist);
      res.json(dbArtist);
    })
    .catch(function(error) {
      console.log("APIROUTES.js: find-artist error = " + error);
    });
});*/

/********************************
   * EXAMPLES START HERE
  /********************************/
// Get all examples
/*app.get("/api/examples", function(req, res) {
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
});*/
