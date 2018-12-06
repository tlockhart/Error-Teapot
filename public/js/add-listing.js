$(function() {
  var $listingBtn = $("#add-listing-btn");
  //insert Artist Profile info:
  function getArtist(artist) {
    console.log("CREATEPROFILE.js: " + JSON.stringify(artist));

    $.get("/api/find-artist/" + artist, function(data) {
      console.log("ARTISTS", data);
      var foundArtist = data;
      if (!foundArtist || !foundArtist.length) {
        //displayEmpty(aartist);
        console.log("No artist found");
      } else {
        //initializeRows();
        console.log("Artist found");
      }
    });
  } //GET ARTIST

  //Form Data must be collected from the form
  //$("#add-listing-redirect-btn").on("click", function(event) {
  //var form = document.getElementsById("add-listing-redirect-btn");
  $listingBtn.on("click", function(event) {
    //form.addEventListener("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    console.log("listen BTN CLICKED");

    artifacts = $("#add-listing-redirect-btn")
      .attr("artist-name-data")
      .val();
    console.log("ARTIST TO SEARCH = " + $searchName);
    /*********************/
    //FIND ARTIST:
    /*********************/
    getArtist($searchName);
    //} //else
  }); //submit-profile-form
}); //Event Listener functions
