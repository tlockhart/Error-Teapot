$(document).ready(function() {
  $(function() {
    var $listingBtn = $("#create-listing-btn");
    //insert Artist Profile info:
    function insertArtifact(artifact) {
      //console.log("ADD-LISTING.js: " + JSON.stringify(artifact));
      var $dataId = $("#create-listing-btn").attr("data-id");
      //$.ajax("/api/add-listing/" + $dataId, {add-new-listing/
      $.ajax("/add-new-listing/" + $dataId, {
        type: "POST",
        data: artifact //Pass the artist object
      }).then(function() {
        //console.log("POST Artist Profile = "+artist);
        // console.log("ADD-LISTING: NEW LISTING WAS LOADED SUCCESSFULLY");
        clearPage();
      });
    } //GET ARTIST

    function clearPage() {
      $("#listing-title").val("");
      $("#listing-price").val("");
      $("#listing-thumb-img").val("");
      $("#listing-full-img").val("");
    }
    //Form Data must be collected from the form data.
    //DATA VALIDATION:
    var dataValid;
    var oneElemIsBlank;
    $listingBtn.on("click", function(event) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();
      //console.log("ADD-LISTING: LISTING BTN CLICKED");

      //SET VARIABLES:
      var $listingTitle = $("#listing-title");
      var $listingPrice = $("#listing-price");
      var $listingThumbImg = $("#listing-thumb-img");
      var $listingFullImg = $("#listing-full-img");

      //CREATE ARRAY OF VALUES:
      var listingInfo = [
        $listingTitle,
        $listingPrice,
        $listingThumbImg,
        $listingFullImg
      ];

      dataValid = true;
      oneElemIsBlank = false;
      /*console.log("length = " + listingInfo.length);
      console.log("Number = " + parseInt(listingInfo[1].val()));
      console.log("Subtract = "+ (parseInt(listingInfo[1].val())-parseInt(listingInfo[1].val())));*/
      //CHECK 1: CYCLE THROUGH ARRAY VALUES:
      for (var i = 0; i < listingInfo.length; i++) {
        //nameMsg = errors[i].msg;
        if (listingInfo[i].val().trim() === "") {
          oneElemIsBlank = true;
          listingInfo[i].css({ "border-color": "red" });
        } else {
          listingInfo[i].css({ "border-color": "" });
        }
      } //for
      //CHECK 2: If price is valid:
      // eslint-disable-next-line prettier/prettier
      if ((parseInt(listingInfo[1].val())-parseInt(listingInfo[1].val())) !== 0) {
        oneElemIsBlank = true;
        listingInfo[1].css({ "border-color": "red" });
      } else {
        listingInfo[1].css({ "border-color": "" });
      }

      if (oneElemIsBlank) {
        dataValid = false;
      } else {
        dataValid = true;
      }

      var newListing = {
        artifactTitle: $listingTitle.val().trim(),
        artifactPrice: parseFloat($listingPrice.val().trim()).toFixed(2), //Get the name that was entered
        artifactThumbImg: $listingThumbImg.val().trim(), //Get the name that was entered
        artifactFullImg: $listingFullImg.val().trim()
      }; //newListing
      /*********************/
      //INSERT ARTIFACT:
      /*********************/
      if (dataValid) {
        insertArtifact(newListing);
      }
    }); //submit-profile-form
  }); //Event Listener functions
}); //document on ready
