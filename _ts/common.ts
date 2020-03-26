// ====================================================================
// Common - js
//
// Scripts for the entire app
// ====================================================================

import * as $ from 'jquery';

(() => {

  /**
   * Document ready
   */
  $(() => {
    revealPage();
  });

  /**
   * Reveal the page with a short delay
   */
  function revealPage() {
    setTimeout(() => {
      $('.page-loader-cover').fadeOut(500, () => {
        $('.page-loader-cover').remove();
      });
    }, 2000);
  }

})();


/**
 * Validate form fields
 * @param elemClass - the selected element to validate
 */
function formValidation(elemClass: Element) {
  // Set form to valid
  let valid = true;
  // Loop through form inputs
  $(elemClass).each((index, elem) => {
    // Check if empty
    if ($(elem).val() === '' || $(elem).val() == null) {
      // Show label
      $(elem).prev('label').show();
      // Set form to invalid
      valid = false;
    } else {
      // Hide label
      $(elem).prev('label').hide();
    }
  });
  // Return true and submit form if valid
  if (valid) {
    return true;
  }
}