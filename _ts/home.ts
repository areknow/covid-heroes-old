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

  $('#form').submit(function(event) {
    const fields = $(this).serializeArray();
    const list = fields.filter(item => item.name === 'list').map(item => item.value);
    const values: FormFieldValues[] = fields.filter(item => item.name !== 'list');
    values.push({
      name: 'list',
      value: list,
    });
    console.log(JSON.stringify(values))
    $.post("https://covidheroes.gives/.netlify/functions/email", { payload: values }).then(() => {
      $('#form button').text('THANK YOU').prop('disabled', true);
      $('#form').addClass('disabled');
    })
    .done(function(done) {
      console.log(done)
    })
    .fail(function(error) {
      console.log(error)
    });
    event.preventDefault();
  });

})();