// ====================================================================
// Home - js
//
// Scripts for the home page
// ====================================================================

import * as $ from 'jquery';

interface FormFieldValues {
  name: string;
  value: string | string[];
}

(() => {

  $('#form button').click(() => {
    event.preventDefault();
    const fields = $('#form').serializeArray();
    const list = fields.filter(item => item.name === 'list').map(item => item.value);
    const values: FormFieldValues[] = fields.filter(item => item.name !== 'list');
    values.push({
      name: 'list',
      value: list,
    });
    console.log(values)
    $.post("https://covidheroes.gives/.netlify/functions/email", JSON.stringify(values)).then(() => {
      $('#form button').text('THANK YOU').prop('disabled', true);
      $('#form').addClass('disabled');
    })
  });

})();