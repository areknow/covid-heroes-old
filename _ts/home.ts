import * as $ from 'jquery';

interface FormFieldValues {
  name: string;
  value: string | string[];
}

const ENDPOINT = "https://covidheroes.gives/.netlify/functions/email";
let submissionAttempted = false;

(() => {

  $('#form button').click((event) => {
    event.preventDefault();
    submissionAttempted = true;
    if (formValidation($('#form input:required'))) {
      processForm();
    }
  });

  $('#form input').change(() => {
    if (submissionAttempted) {
      formValidation($('#form input:required'));
    }
  });

})();

async function processForm() {
  const fields = $('#form').serializeArray();
  const list = fields.filter(item => item.name === 'list').map(item => item.value);
  const values: FormFieldValues[] = fields.filter(item => item.name !== 'list');
  values.push({ name: 'list', value: list });
  try {
    await $.post(ENDPOINT, JSON.stringify(values));
    $('#form button').text('THANK YOU').prop('disabled', true);
    $('#form').addClass('disabled');
  } catch (error) {
    $('#form').hide();
    $('.form-error').show();
  }
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