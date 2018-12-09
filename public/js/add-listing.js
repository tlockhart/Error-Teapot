$(document).ready(function() {
  $(function() {
    var $listingBtn = $("#create-listing-btn");
    //insert Artist Profile info:
    function insertArtifact(artifact) {
      console.log("ADD-LISTING.js: " + JSON.stringify(artifact));
      var $dataId = $("#create-listing-btn").attr("data-id");
      //$.ajax("/api/add-listing/" + $dataId, {add-new-listing/
      $.ajax("/add-new-listing/" + $dataId, {
        type: "POST",
        data: artifact //Pass the artist object
      }).then(function() {
        //console.log("POST Artist Profile = "+artist);
        console.log("ADD-LISTING: NEW LISTING WAS LOADED SUCCESSFULLY");
        clearPage();
      });
    } //GET ARTIST

    function clearPage() {
      $("#listing-title").val("");
      $("#listing-price").val("");
      $("#listing-thumb-img").val("");
      $("#listing-full-img").val("");
    }
    //Form Data must be collected from the form
    //$("#add-listing-redirect-btn").on("click", function(event) {
    //var form = document.getElementsById("add-listing-redirect-btn");
    $listingBtn.on("click", function(event) {
      //form.addEventListener("submit", function(event) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();
      console.log("LISTING BTN CLICKED");

      var newListing = {
        artifactTitle: $("#listing-title")
          .val()
          .trim(),
        artifactPrice: $("#listing-price")
          .val()
          .trim(), //Get the name that was entered
        artifactThumbImg: $("#listing-thumb-img")
          .val()
          .trim(), //Get the name that was entered
        artifactFullImg: $("#listing-full-img")
          .val()
          .trim()
      }; //newListing
      /*********************/
      //INSERT ARTIFACT:
      /*********************/
      insertArtifact(newListing);
    }); //submit-profile-form
  }); //Event Listener functions
}); //document on ready
/***************************************************************************/
/*$(function() {
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
    }); //$get
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
    getArtist($searchName);
    //} //else
  }); //submit-profile-form
}); //Event Listener functions*/
