/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
$(document).ready(() => {
  $(() => {
    function findArtist(name) {
      location.replace(`/display-user-store/${name}`);
    } // findArtist
    function clearFields(namePtr) {
      // clear field
      namePtr.val('');
    } // clearFields
    function passArtistName(nameVal, namePtr) {
      // Form validation
      function validateForm() {
        let isValid = true;
        if (nameVal === '') {
          isValid = false;
          // console.log("Blank User Name = " + nameValue);
          namePtr.css({ 'border-color': 'red' });
        }
        return isValid;
      } // validateForm()

      const nameValid = validateForm();
      // console.log("ISVALID = "+burgerValid);
      if (!nameValid) {
        alert('Please enter a user name before submitting!');
      } else {
        /** *********************** */
        // Assemble Object
        /** ********************** */
        const artist = {
          name: nameVal, // Get the name that was entered
        };
        /** *********************************
         * RESET Any Approver Error Handling
         ********************************** */
        namePtr.css({ 'border-color': '' });
        findArtist(artist.name);
        clearFields(namePtr);
      }
    } // passArtistName

    // When user clicks search on the index page:
    $('#find-artist-btn').on('click', (event) => {
      event.preventDefault();
      // index page search text
      const $artistIndexNameValue = $('#artist-name')
        .val()
        .replace(/[^A-Z0-9]/gi, '');
      const $artistIndexNamePtr = $('#artist-name');

      if ($artistIndexNameValue !== '') {
        passArtistName($artistIndexNameValue, $artistIndexNamePtr);
      }
    }); // submit-btn

    // When user clicks search in the header:
    $('#header-find-artist-btn').on('click', (event) => {
      event.preventDefault();
      // header search text
      const $artistHeaderNameValue = $('#search')
        .val()
        .replace(/[^A-Z0-9]/gi, '');

      const $artistHeaderNamePtr = $('#search');

      if ($artistHeaderNameValue !== '') {
        passArtistName($artistHeaderNameValue, $artistHeaderNamePtr);
      }
    }); // submit-btn
  }); // function
}); // document on ready
