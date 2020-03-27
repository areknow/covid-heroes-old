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
    $.post("https://covidheroes.gives/.netlify/functions/email", values).then(() => {
      alert("Thank you!");
    });
    event.preventDefault();
  });

})();