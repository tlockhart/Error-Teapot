$(function() {
  //insert Artist Profile info:
  function insertArtist(artist) {
    console.log("CREATEPROFILE.js: " + JSON.stringify(artist));
    $.ajax("/api/create-profile", {
      type: "POST",
      data: artist //Pass the burger object and its id and state properties to the put method
    }).then(function() {
      //console.log("POST Artist Profile = "+artist);
      location.reload();
    });
  } //insertApprover

  //Form Data must be collected from the form
  $("#create-artist-btn").on("click", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    //console.log("APPROVED BUTTON CLICKED");

    var newArtist = {
      artistName: $("#artist-name")
        .val()
        .trim(), //Get the name that was entered
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
