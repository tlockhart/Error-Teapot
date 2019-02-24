/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
const db = require('../models');

module.exports = (app) => {
  // *************************************
  //  * AVANT HTML ROUTES
  //  * http://localhost:3000/
  // ************************************/
  // **************************************************************
  //  * DATA PASS ROUTE1: UPDATE-PROFILE
  //  * CALLED-BY: CREATE-PROFILE.JS
  //  * PURPOSE: TO UPDATE THE BIO AND AVATAR OF A NEW USER PROFILE
  //  * IN THE ARTIST TABLE.
  //  * REDIRECT: TO ADD-LISTING PAGE.
  //  ***************************************************************/
  app.put('/update-profile', (req, res) => {
    db.Artist.update(
      {
        // ****************************************
        // * DATA PASSED IN FROM CREATE-PROFILE FORM
        // ****************************************
        // artistName: req.body.artistName,
        // email: req.body.artistEmail,
        bio: req.body.artistBio,
        avatarUrl: req.body.artistAvatar,
      },
      {
        where: {
          artistName: req.body.artistName,
        },
      },
    )
      .then(() => {
        res.status(200).send('ok');
      })
      // eslint-disable-next-line prettier/prettier
      .catch((error) => {
        // console.log("APIROUTES.js: Could not insert new profile = " + error);
      });
  });
  // **************************************************************
  // * DATA PASS ROUTE2: RETRIEVE-ID
  //  * CALLED-BY: CREATE-PROFILE.JS
  //  * PURPOSE: RETURNS THE ARTIST'S ID FROM THE ARTIST TABLE,
  //  * BASED ON HIS USER NAME, WHICH IS PASSED IN AS A NAME PARAMATER
  //  * REDIRECT: NONE
  //  ***************************************************************/
  app.get('/retrieve-id/:name', (req, res) => {
    const artistSessionName = req.params.name;
    db.Artist.findOne({
      where: {
        artistName: artistSessionName,
      },
    })
      .then((artistInfo) => {
        // return a json object
        res.json(artistInfo);
      })
      .catch((error) => {
        /* console.log(
            "APIROUTES.js: Could not find artist ID by user name error = " + error
          ); */
      }); // catch
  }); // Artist-ID
  // **************************************************************
  // * DATA PASS ROUTE3: ADD-NEW-LISTING
  //  * CALLED-BY: ADD-LISTING.JS
  //  * PURPOSE: PULLS THE ARTIST ID FROM THE HTML PAGE TO INSERT AS
  //  * A FOREIGN KEY IN THE ARTIFACT TABLE, ALONG WITH FORM DATA,
  //  * WHEN THE CREATE-LISTING-BTN IS CLICKED
  //  * REDIRECT: NONE
  //  ***************************************************************/
  app.post('/add-new-listing/:id', (req, res) => {
    const artistId = req.params.id;
    /* console.log(
        "APIROUTES api/add-listing POST ROUTE- INSERT ARTIFACT ID: " + artistId
      );
      console.log("********************************************************");
      console.log("APIROUTES: " + JSON.stringify(req.body)); */
    db.Artifact.create({
      title: req.body.artifactTitle,
      thumbImgUrl: req.body.artifactThumbImg,
      fullImgUrl: req.body.artifactFullImg,
      price: req.body.artifactPrice,
      ArtistId: artistId,
    })
      .then(() => {
        // res.json(data); //pass data to front end
        res.status(200).send('ok');
      })
      .catch((error) => {
        /* console.log(
            "APIROUTES.js: Could not post data to the artifacts table: error = " +
              error
          ); */
      });
  });

  // ****************************************************************
  // * DATA PASS ROUTE4: DISPLAY-STORE-FRONT
  // * CALLED-BY: VIEW-STORE-FRONT.JS WHEN THE VIEW-GALLERY-BTN IS CLICKED
  // * PURPOSE: PULLS THE ARTIST ID FROM THE HTML PAGE TO INSERT AS
  // * A FOREIGN KEY IN THE ARTIFACT TABLE, ALONG WITH FORM DATA
  // * REDIRECT: STORE-FRONT
  // *****************************************************************/
  app.get('/display-store-front/:id', (req, res) => {
    const id = req.params.id;
    db.Artist.findOne({
      where: {
        id,
      },
    })
      .then((objArtist) => {
        db.Artifact.findAll({
          where: {
            // ArtistId: artist.id
            ArtistId: id,
          },
        }).then((arrArtifacts) => {
          const data = {
            artist: {
              name: objArtist.artistName,
              email: objArtist.email,
              bio: objArtist.bio,
              avatar: objArtist.avatarUrl,
            },
            artifacts: arrArtifacts,
          }; // data
          // console.log("STOREFRONT DATA =" + JSON.stringify(data));
          return res.render('store-front', data); // res render
        }).catch((error) => {
          /* console.log(
              "APIROUTES.js: Could not find artist ID in the Artist/Artifacts table : error = " +
                error
            ); */
          return res.render(`Could not find artist: ${id}`);
        }); // catch
      }) // outer then
      .catch((error) => {
        /* console.log(
            "APIROUTES.js: Could not find artist ID in the Artist/Artifacts table : error = " +
              error
          ); */
        return res.render(`Could not find artist: ${id}`);
      }); // catch
  }); // StoreFront
  // ****************************************************************
  // * DATA PASS ROUTE5: DISPLAY-ARTIST-STORE
  // * CALLED-BY: FIND-ARTIST.JS WHEN THE ARTIST-SEARCH-BTN IS CLICKED
  //  * PURPOSE: DISPLAYS THE ARTIST'S STORE FRONT
  // * REDIRECT: STORE-FRONT
  //  *****************************************************************/
  app.get('/display-user-store/:name', (req, res) => {
    const name = req.params.name;
    db.Artist.findOne({
      where: {
        artistName: name,
      },
    })
      .then((objArtist) => {
        db.Artifact.findAll({
          where: {
            ArtistId: objArtist.id,
          },
        })
          .then((arrArtifacts) => {
            const data = {
              artist: {
                name: objArtist.artistName,
                email: objArtist.email,
                bio: objArtist.bio,
                avatar: objArtist.avatarUrl,
              },
              artifacts: arrArtifacts,
            }; // data
            // console.log("STOREFRONT DATA =" + JSON.stringify(data));
            return res.render('store-front', data); // res render
          }) // inner then
          // eslint-disable-next-line arrow-body-style
          .catch((error) => {
            return res.render(`No storefront found ${error}`);
            /* console.log(
            "APIROUTES.js: No Artist Found, can't display page - " + error
            ); */
          });
      }) // outer then
      // eslint-disable-next-line arrow-body-style
      .catch((error) => {
        return res.render(`No Artist Found ${error}`);
        /* console.log(
           "APIROUTES.js: No Artist Found, no matching
           ArtistId in Artifact table, can't display page - " +
              error
          ); */
      });
  });
  // **********************************************************
  // * HTML ROUTE1: DISPLAY-PROFILE
  // * CALLED-BY: LOGINROUTES.JS 3 TIMES
  // * PURPOSE: TO PASS USER ID TO QUERY THE USER TABLE,
  // * IN ORDER TO PRE-POPULATE THE USERNAME AND EMAIL
  // * ADDRESS IN THE CREATE-PROFILE PAGE
  // * RENDER: NONE
  // ***********************************************************/
  app.get('/display-profile', (req, res) => {
    const id = req.query.id;
    // console.log("HTML ROUTES : id = " + id);
    db.Artist.findOne({
      where: {
        id,
      },
    })
      // eslint-disable-next-line arrow-body-style
      .then((artistLogin) => {
        return res.render('create-profile', {
          login: {
            name: artistLogin.artistName,
            email: artistLogin.email,
            bio: artistLogin.bio,
            avatar: artistLogin.avatarUrl,
          },
        }); // res render
      }) // inner then
      // eslint-disable-next-line no-unused-vars
      .catch((error) => {
        /* console.log(
          "HTMLROUTES.js: Could not find a matching artist for that userId = " +
            error
        ); //console */
      }); // catch
  });
  // *********************************************
  // * HTML ROUTE2: DISPLAY-ADD-LISTING
  // * CALLED BY: CREATE-PROFILE.JS
  // * PURPOSE: DISPLAY THE ADD-LISTING PAGE AND
  // * PASS THE USER ID TO BE INSERTED IN THE
  // * ARTIFACTS TABLE AS A FOREIGN KEY.
  // * RENDER: ADD-LISTING
  // *********************************************/
  app.get('/display-add-listing/:id', (req, res) => {
    const passedId = req.params.id;
    /* console.log("***********************************************");
    console.log("HTMLROUTES.js:  ADD-LISTING GET ROUTE " + passedId);
    console.log("***********************************************"); */
    res.render('add-listing', { id: passedId }); // pass value in the body
  });
  // *********************************************
  // * HTML ROUTE3: LOAD INDEX.HANDLEBARS PAGE
  // * CALLED BY: URL
  // * PURPOSE: DISPLAY THE ARTIST SEARCH PAGE
  // * REDIRECT: iNDEX.HANDLEBARS
  // *********************************************/
  app.get('/', (req, res) => {
    res.render('index');
  }); // GET
}; // MODULE EXPORTS
