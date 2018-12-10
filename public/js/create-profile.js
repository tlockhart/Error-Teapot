$(document).ready(function() {
  $(function() {
    //Disable User Name and Email
    $(".artist-name-profile").prop("disabled", true);
    $(".artist-email-profile").prop("disabled", true);
    //insert Artist Profile info:
    function insertArtist(artist) {
      //console.log("CREATEPROFILE.js: " + JSON.stringify(artist));
      //$.ajax("/api/create-profile", {
      $.ajax("/update-profile", {
        type: "PUT",
        data: artist //Pass the artist object
      }).then(function() {
        //console.log("POST Artist Profile = "+artist);
        //console.log("CREATE-PROFILE: NEW PROFILE WAS LOADED SUCCESSFULLY");

        //disable resubmit button
        $("#create-profile-btn").prop("disabled", true);
        console.log("ARTIST NAME = " + artistName);
        $("#add-listing-redirect-btn").attr("artist-name-data", artistName);
        clearPage();
        getArtistId(artistName);
        //Change location to listing page if artist inserted
        location.replace("display-add-listing/" + id); //from Artist table
      });
    } //insert Profile
    function getArtistId(name) {
      console.log("CREATEPROFILE.js: " + name);
      $.get("/retrieve-id/" + name, function(getData) {
        console.log("********************************");
        console.log("ARTIST Name = ", name);
        console.log("ARTIST ID = ", getData.id);
        console.log("********************************");
        //REQUIRED: MUST USE TO REDIRECT to new view
        location.replace("/display-add-listing/" + getData.id);
        //});
      });
    } //getID
    function clearPage() {
      $(".artist-name-profile").val("");
      $("#artist-avatar").val("");
      $(".artist-email-profile").val("");
      $("#artist-bio").val("");
    }
    var dataValid = true;
    //Form Data must be collected from the form
    $("#create-profile-btn").on("click", function(event) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();
      //console.log("APPROVED BUTTON CLICKED");
      artistName = $(".artist-name-profile")
        .val()
        .trim()
        .toLowerCase();

      var $artistAvatar = $("#artist-avatar");
      var $artistEmail = $(".artist-email-profile");
      var $artistBio = $("#artist-bio");

      var artistProfile = [$artistAvatar, $artistEmail, $artistBio];
      var oneElemIsBlank = false;
      for (var i = 0; i < artistProfile.length; i++) {
        //nameMsg = errors[i].msg;
        if (artistProfile[i].val().trim() === "") {
          oneElemIsBlank = true;
          artistProfile[i].css({ "border-color": "red" });
        } else {
          artistProfile[i].css({ "border-color": "" });
        }
      } //for
      if (oneElemIsBlank) {
        dataValid = false;
      } else {
        dataValid = true;
      }
      var newArtist = {
        artistName: artistName,
        //artistName: $("#artist-name").trim(), //Get the name that was entered
        artistAvatar: $artistAvatar.val().trim(), //Get the name that was entered
        artistEmail: $artistEmail.val().trim(), //Get the name that was entered
        artistBio: $artistBio.val().trim()
      }; //newArtist

      /*********************/
      //INSERT NEW APPROVER:
      /*********************/
      if (dataValid) {
        insertArtist(newArtist);
      }
    }); //submit-profile-form
  }); //Event Listener functions
}); //documentOnReady
