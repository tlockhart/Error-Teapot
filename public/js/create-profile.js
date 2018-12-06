$(function() {
  //artist name taken from text;
  var artistName;
  //insert Artist Profile info:
  function insertArtist(artist) {
    console.log("CREATEPROFILE.js: " + JSON.stringify(artist));
    $.ajax("/api/create-profile", {
      type: "POST",
      data: artist //Pass the artist object
    }).then(function() {
      //console.log("POST Artist Profile = "+artist);
      console.log("CREATE-PROFILE: NEW PROFILE WAS LOADED SUCCESSFULLY");

      //disable resubmit button
      $("#create-profile-btn").prop("disabled", true);
      console.log("ARTIST NAME = " + artistName);
      $("#add-listing-redirect-btn").attr("artist-name-data", artistName);
      clearPage();

      //Set the data-state attribute on the create-page to 1
      //$("#create-profile-btn").attr("data-state", 1);

      //Change location to listing page if artist inserted
      location.replace("/html/add-listing/" + artistName);

      //no page reload page
      //location.reload();
    });
  } //insert Profile

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
      .replace(/[^A-Z0-9]/gi, "")
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
    //} //else
  }); //submit-profile-form
}); //Event Listener functions
