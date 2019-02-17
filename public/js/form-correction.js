$(document).ready(() => {
  $('.artist-input').keyup(function () {
    $(this).val(
      $(this)
        .val()
        .replace(/\s+/g, '')
        .toLowerCase(),
    );
  });
});
