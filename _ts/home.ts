import * as $ from 'jquery';

interface FormFieldValues {
  name: string;
  value: string | string[];
}

const ENDPOINT: string = '/.netlify/functions/email';

let ATTEMPTED = false;

let DONATE: boolean = false;
let REQUEST: boolean = false;
let VOLUNTEER: boolean = false;

const SCROLL_OFFSET = 60;

(() => {

  // tslint:disable-next-line: only-arrow-functions
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

  $('#form input[name="volunteer"]').change(() => {
    const value = $('input[name="volunteer"]:checked').val() as string;
    value === 'volunteer' ? VOLUNTEER = true : VOLUNTEER = false;
    switchForm();
  });

  $('#form button').click((event) => {
    event.preventDefault();
    ATTEMPTED = true;
    if (formValidation($('#form input:required'))) {
      processForm();
    }
  });

  $('#form input').change(() => {
    if (ATTEMPTED) {
      formValidation($('#form input:required'));
    }
  });

})();

function switchForm() {
  let placeholder = '';
  let label = '';
  if (VOLUNTEER) {
    $('#form #fields').show();
    $('#form #submit').show();
  }
  if (REQUEST) {
    label = 'requesting';
    placeholder = 'request';
  }
  if (DONATE) {
    label = 'donating';
    placeholder = 'donate';
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
  try {
    await $.post(ENDPOINT, JSON.stringify(data));
    $('#form button').text('THANK YOU').prop('disabled', true);
    $('#form').addClass('disabled');
  } catch (error) {
    $('#form').hide();
    $('.form-error').show();
  }
}

function find(key: string) {
  const $form = $('#form');
  return $form.find(`[name=${key}]`).val() || 'N/A';
}

function formValidation(elemClass: JQuery<HTMLElement>) {
  let valid = true;
  for (const elem of $(elemClass)) {
    if ($(elem).val() === '' || $(elem).val() === null) {
      $(elem).addClass('error');
      valid = false;
    } else {
      $(elem).removeClass('error');
    }
  }
  return valid;
}