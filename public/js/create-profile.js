$(document).ready(function() {
  $(function() {
    //Disable User Name and Email
    $("#artist-name").prop("disabled", true);
    $("#artist-email").prop("disabled", true);
    //insert Artist Profile info:
    function insertArtist(artist) {
      console.log("CREATEPROFILE.js: " + JSON.stringify(artist));
      //$.ajax("/api/create-profile", {
      $.ajax("/update-profile", {
        type: "PUT",
        data: artist //Pass the artist object
      }).then(function() {
        //console.log("POST Artist Profile = "+artist);
        console.log("CREATE-PROFILE: NEW PROFILE WAS LOADED SUCCESSFULLY");

        //disable resubmit button
        $("#create-profile-btn").prop("disabled", true);
        console.log("ARTIST NAME = " + artistName);
        $("#add-listing-redirect-btn").attr("artist-name-data", artistName);
        clearPage();
        getArtistId(artist.artistName);
        //Change location to listing page if artist inserted
        //location.replace("/html/add-listing/" + artistName);
        location.replace("/html/add-listing/" + id); //from Artist table
        //res.redirect("/html/add-listing/" + artistName);
      });
    } //insert Profile
    function getArtistId(name) {
      console.log("CREATEPROFILE.js: " + name);
      //$.get("/api/artist-id/" + name, function(getData) {
      $.get("/retrieve-id/" + name, function(getData) {
        console.log("ARTIST ID = ", getData.id);
        //location.replace("/html/add-listing/" + data.id);
        //$.post("/api/store-id", { artistId: getData.id }, function() {
        //REQUIRED: MUST USE TO REDIRECT to new view
        //location.replace("/html/add-listing/" + getData.id);
        location.replace("/display-add-listing/" + getData.id);
        //});
      });
    } //getID
    function clearPage() {
      $("#artist-name").val("");
      $("#artist-avatar").val("");
      $("#artist-email").val("");
      $("#artist-bio").val("");
    }
    //Form Data must be collected from the form
    $("#create-profile-btn").on("click", function(event) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();
      //console.log("APPROVED BUTTON CLICKED");
      artistName = $("#artist-name")
        .val()
        .trim()
        /*.replace(/[^A-Z0-9]/gi, "")*/
        .toLowerCase();

      var newArtist = {
        artistName: artistName,
        //artistName: $("#artist-name").trim(), //Get the name that was entered
        artistAvatar: $("#artist-avatar")
          .val()
          .trim(), //Get the name that was entered
        artistEmail: $("#artist-email")
          .val()
          .trim(), //Get the name that was entered
        artistBio: $("#artist-bio")
          .val()
          .trim()
      }; //newArtist

      /*********************/
      //INSERT NEW APPROVER:
      /*********************/
      insertArtist(newArtist);
    }); //submit-profile-form
  }); //Event Listener functions
}); //documentOnReady
