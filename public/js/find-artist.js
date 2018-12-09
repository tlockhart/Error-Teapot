$(document).ready(function() {
  $(function() {
    function findArtist(name) {
      location.replace("/display-user-store/" + name);
    } //findArtist
    function clearFields(namePtr){
      //clear field
      namePtr.val("");
    }clearFields
    function passArtistName(nameVal, namePtr) {
      // Form validation
      function validateForm() {
        var isValid = true;
        if (nameVal === "") {
          isValid = false;
          console.log("Blank User Name = " + nameValue);
          namePtr.css({ "border-color": "red" });
        }
        return isValid;
      } //validateForm()

      var nameValid = validateForm();
      //console.log("ISVALID = "+burgerValid);
      if (!nameValid) {
        alert("Please enter a user name before submitting!");
      } //if
      else {
        /**************************/
        //INSERT BURGER
        /*************************/
        var artist = {
          name: nameVal //Get the name that was entered
        };
        //console.log("Approvers SENT FROM HSBOBJECT = "+hbsObject.approvers);
        /***********************************
         * RESET Any Approver Error Handling
         ***********************************/
        //$('.approverName-message').css({'color':''});
        namePtr.css({ "border-color": "" });
        findArtist(artist.name);
        clearFields(namePtr);
      }
    }//passArtistName

    //When user clicks search on the index page:
    $("#find-artist-btn").on("click", function (event) {
      event.preventDefault();
      //index page search text
      var $artistIndexNameValue = $("#artist-name")
        .val()
        .replace(/[^A-Z0-9]/gi, "");
      var $artistIndexNamePtr = $("#artist-name");

      if ($artistIndexNameValue !== "") {
        passArtistName($artistIndexNameValue, $artistIndexNamePtr);
      }
    }); //submit-btn

    //When user clicks search in the header:
    $("#header-find-artist-btn").on("click", function (event) {
      event.preventDefault();
      //header search text
      var $artistHeaderNameValue = $("#search")
        .val()
        .replace(/[^A-Z0-9]/gi, "");

      var $artistHeaderNamePtr = $("#search");

      if ($artistHeaderNameValue !== "") {
        passArtistName($artistHeaderNameValue, $artistHeaderNamePtr);
      }
    }); //submit-btn
  }); //function
}); //document on ready
