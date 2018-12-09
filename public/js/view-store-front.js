$(function() {
  var $viewStoreFrontBtn = $("#view-store-front-btn");
  function viewStoreFront() {
    //disable resubmit button
    //$("#create-listing-btn").prop("disabled", true);

    clearPage();
    var $dataId = $("#create-listing-btn").attr("data-id");
    //REQUIRED: MUST USE TO REDIRECT to new view
    location.replace("/display-store-front/" + $dataId);
  } //display storefront

  function clearPage() {
    $("#listing-title").val("");
    $("#listing-price").val("");
    $("#listing-thumb-img").val("");
    $("#listing-full-img").val("");
  }

  $viewStoreFrontBtn.on("click", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    console.log("VIEW STORE FRONT BTN CLICKED");
    /*********************/
    //VIEW STOREFRONT:
    /*********************/
    viewStoreFront();
  }); //ViewStoreFront Btn click
}); //Event Listener functions
