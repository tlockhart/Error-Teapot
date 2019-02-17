/* eslint-disable no-undef */
$(document).ready(() => {
  $(() => {
    const $listingBtn = $('#create-listing-btn');

    function clearPage() {
      $('#listing-title').val('');
      $('#listing-price').val('');
      $('#listing-thumb-img').val('');
      $('#listing-full-img').val('');
    }

    // insert Artist Profile info:
    function insertArtifact(artifact) {
      // console.log("ADD-LISTING.js: " + JSON.stringify(artifact));
      const $dataId = $('#create-listing-btn').attr('data-id');
      // $.ajax("/api/add-listing/" + $dataId, {add-new-listing/
      $.ajax(`/add-new-listing/${$dataId}`, {
        type: 'POST',
        data: artifact, // Pass the artist object
      }).then(() => {
        // console.log("POST Artist Profile = "+artist);
        // console.log("ADD-LISTING: NEW LISTING WAS LOADED SUCCESSFULLY");
        clearPage();
      });
    } // GET ARTIST

    // Form Data must be collected from the form data.
    // DATA VALIDATION:
    let dataValid;
    let oneElemIsBlank;
    $listingBtn.on('click', (event) => {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();
      // console.log("ADD-LISTING: LISTING BTN CLICKED");

      // SET VARIABLES:
      const $listingTitle = $('#listing-title');
      const $listingPrice = $('#listing-price');
      const $listingThumbImg = $('#listing-thumb-img');
      const $listingFullImg = $('#listing-full-img');

      // CREATE ARRAY OF VALUES:
      const listingInfo = [
        $listingTitle,
        $listingPrice,
        $listingThumbImg,
        $listingFullImg,
      ];

      dataValid = true;
      oneElemIsBlank = false;

      // CHECK 1: CYCLE THROUGH ARRAY VALUES:
      for (let i = 0; i < listingInfo.length; i += 1) {
        // nameMsg = errors[i].msg;
        if (listingInfo[i].val().trim() === '') {
          oneElemIsBlank = true;
          listingInfo[i].css({ 'border-color': 'red' });
        } else {
          listingInfo[i].css({ 'border-color': '' });
        }
      } // for
      // CHECK 2: If price is valid:
      // eslint-disable-next-line prettier/prettier
      if ((parseInt(listingInfo[1].val(), 10) - parseInt(listingInfo[1].val(), 10)) !== 0) {
        oneElemIsBlank = true;
        listingInfo[1].css({ 'border-color': 'red' });
      } else {
        listingInfo[1].css({ 'border-color': '' });
      }

      if (oneElemIsBlank) {
        dataValid = false;
      } else {
        dataValid = true;
      }

      const newListing = {
        artifactTitle: $listingTitle.val().trim(),
        // Get the name that was entered
        artifactPrice: parseFloat($listingPrice.val().trim()).toFixed(2),
        artifactThumbImg: $listingThumbImg.val().trim(), // Get the name that was entered
        artifactFullImg: $listingFullImg.val().trim(),
      }; // newListing
      /** ****************** */
      // INSERT ARTIFACT:
      /** ****************** */
      if (dataValid) {
        insertArtifact(newListing);
      }
    }); // submit-profile-form
  }); // Event Listener functions
}); // document on ready
