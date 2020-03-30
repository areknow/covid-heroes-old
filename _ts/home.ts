import * as $ from 'jquery';

const ENDPOINT: string = '/.netlify/functions/email';

let ATTEMPTED = false;

let DONATE: boolean = false;
let REQUEST: boolean = false;
let VOLUNTEER: boolean = false;

const SCROLL_OFFSET = 60;

(() => {

  // CTA click action
  $('#hero #action').click(function(event) {
    $('html, body').animate({
      scrollTop: $('#donate').offset().top - SCROLL_OFFSET
    }, 1000);
    const button = $(event.target).attr('data-key');
    switch (button) {
      case 'donate':
        $('#form input[value="donate"]').click();
        break;
      case 'request':
        $('#form input[value="request"]').click();
        break;
    }
  });

  // Radio type listener
  $('#form input[name="type"]').change(() => {
    const value = $('input[name="type"]:checked').val() as string;
    if (value === 'donate') {
      DONATE = true;
      REQUEST = false;
    } else if (value === 'request') {
      DONATE = false;
      REQUEST = true;
    }
    switchForm();
  });

  // Volunteer checkbox listener
  $('#form input[name="volunteer"]').change(() => {
    const value = $('input[name="volunteer"]:checked').val() as string;
    value === 'volunteer' ? VOLUNTEER = true : VOLUNTEER = false;
    switchForm();
  });

  // Form submit action
  $('#form button').click((event) => {
    event.preventDefault();
    ATTEMPTED = true;
    if (formValidation($('#form input:required'))) {
      processForm();
    }
  });

  // Form input change listener
  $('#form input').change(() => {
    if (ATTEMPTED) {
      formValidation($('#form input:required'));
    }
  });

})();

/**
 * Switch form actions - the form is modified based on the different selected variables
 */
function switchForm() {
  let placeholder = '';
  let label = '';
  if (VOLUNTEER) {
    $('#form #fields').show();
    $('#form #submit').show();
    $('#form #orgName').hide();
  }
  if (REQUEST) {
    label = 'requesting';
    placeholder = 'request';
    $('#form #orgName').show();
  }
  if (DONATE) {
    label = 'donating';
    placeholder = 'donate';
    $('#form #orgName').hide();
  }
  if (DONATE || REQUEST) {
    $('#form #requestType').text(label);
    $('textarea').attr('placeholder', `Please let us know if you have other items you would like to ${placeholder}.`);
    $('#form #fields').show();
    $('#form #items').show();
    $('#form #submit').show();
  }
  if (!VOLUNTEER && !DONATE && !REQUEST) {
    $('#form #fields').hide();
    $('#form #items').hide();
    $('#form #submit').hide();
  }
}

/**
 * Form processing - data collection and POST submission to server
 */
async function processForm() {
  let type = '';
  if (DONATE && !REQUEST) {
    type = 'donation';
  } else if (!DONATE && REQUEST) {
    type = 'request';
  } else if (!DONATE && !REQUEST && VOLUNTEER) {
    type = 'volunteer';
  }
  // Collect list data
  const list: string[] = [];
  $.each($('[name=list]:checked'), function() {
    list.push($(this).val() as string);
  });
  // Collect form data
  const data = {
    type,
    first: find('firstName'),
    last: find('lastName'),
    org: find('orgName'),
    email: find('email'),
    phone: find('phone'),
    street: find('street'),
    city: find('city'),
    state: find('state'),
    zip: find('zip'),
    other: find('other'),
    volunteer: VOLUNTEER ? 'Yes' : 'No',
    list: list.length ? list.join(', ') : 'N/A',
  };
  // POST to lambda function
  try {
    await $.post(ENDPOINT, JSON.stringify(data));
    $('#form button').text('THANK YOU').prop('disabled', true);
    $('#form').addClass('disabled');
  } catch (error) {
    $('#form').hide();
    $('.form-error').show();
  }
}

/**
 * Find helper - scans the form for the requested field name
 * @param key: the name of the form input
 */
function find(key: string) {
  const $form = $('#form');
  return $form.find(`[name=${key}]`).val() || 'N/A';
}

/**
 * Form validataion helper - checks required attributes and blocks form submission
 * @param element: the input that needs to be checked
 */
function formValidation(element: JQuery<HTMLElement>) {
  let valid = true;
  for (const elem of $(element)) {
    if ($(elem).val() === '' || $(elem).val() === null) {
      $(elem).addClass('error');
      valid = false;
    } else {
      $(elem).removeClass('error');
    }
  }
  return valid;
}