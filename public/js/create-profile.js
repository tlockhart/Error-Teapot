/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
$(document).ready(() => {
  // eslint-disable-next-line no-undef
  $(() => {
    // Disable User Name and Email
    $('.artist-name-profile').prop('disabled', true);
    $('.artist-email-profile').prop('disabled', true);
    // insert Artist Profile info:
    function getArtistId(name) {
      // console.log(`CREATEPROFILE.js: ${name}`);
      $.get(`/retrieve-id/${name}`, (getData) => {
        /* console.log('********************************');
        console.log('ARTIST Name = ', name);
        console.log('ARTIST ID = ', getData.id);
        console.log('********************************'); */

        // REQUIRED: MUST USE TO REDIRECT to new view
        // eslint-disable-next-line no-restricted-globals
        location.replace(`/display-add-listing/${getData.id}`);
      });
    } // getID

    function clearPage() {
      $('.artist-name-profile').val('');
      $('#artist-avatar').val('');
      $('.artist-email-profile').val('');
      $('#artist-bio').val('');
    }
    function updateArtist(artist) {
      // console.log("CREATEPROFILE.js: " + JSON.stringify(artist));
      // $.ajax("/api/create-profile", {
      $.ajax('/update-profile', {
        type: 'PUT',
        data: artist, // Pass the artist object
      }).then(() => {
        // console.log("POST Artist Profile = "+artist);
        // console.log("CREATE-PROFILE: NEW PROFILE WAS LOADED SUCCESSFULLY");

        // disable resubmit button
        $('#create-profile-btn').prop('disabled', true);
        // console.log('ARTIST NAME = ' + artistName);
        $('#add-listing-redirect-btn').attr('artist-name-data', artistName);
        clearPage();
        getArtistId(artistName);
        // Change location to listing page if artist inserted
        // eslint-disable-next-line no-restricted-globals
        location.replace(`display-add-listing/${id}`); // from Artist table
      });
    } // insert Profile
    let dataValid = true;
    // Form Data must be collected from the form
    $('#create-profile-btn').on('click', (event) => {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();
      // console.log("APPROVED BUTTON CLICKED");
      artistName = $('.artist-name-profile')
        .val()
        .trim()
        .toLowerCase();

      const $artistAvatar = $('#artist-avatar');
      const $artistEmail = $('.artist-email-profile');
      const $artistBio = $('#artist-bio');
      const artistProfile = [$artistAvatar, $artistEmail, $artistBio];
      let oneElemIsBlank = false;
      for (let i = 0; i < artistProfile.length; i += 1) {
        // nameMsg = errors[i].msg;
        if (artistProfile[i].val().trim() === '') {
          oneElemIsBlank = true;
          artistProfile[i].css({ 'border-color': 'red' });
        } else {
          artistProfile[i].css({ 'border-color': '' });
        }
      } // for
      if (oneElemIsBlank) {
        dataValid = false;
      } else {
        dataValid = true;
      }
      const newArtist = {
        artistName,
        artistAvatar: $artistAvatar.val().trim(), // Get the name that was entered
        artistEmail: $artistEmail.val().trim(), // Get the name that was entered
        artistBio: $artistBio.val().trim(),
      }; // newArtist

      // *********************
      // INSERT NEW APPROVER:
      // *********************
      if (dataValid) {
        updateArtist(newArtist);
      }
    }); // submit-profile-form
  }); // Event Listener functions
}); // documentOnReady
