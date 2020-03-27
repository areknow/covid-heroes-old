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

  /**
   * Document ready
   */
  $(() => {
    // console.log('homes');

    // const json = '[{"name":"firstName","value":"Arnaud"},{"name":"lastName","value":"Crowther"},{"name":"phone","value":"2486879033"},{"name":"email","value":"arnaudcrowther@gmail.com"},{"name":"street","value":"644 Selden St. #301"},{"name":"city","value":"Detroit"},{"name":"state","value":"MI"},{"name":"other","value":"asdasdasda"},{"name":"volunteer","value":"true"},{"name":"list","value":["N95 Masks (or any surgical masks)","Latex/Rubber gloves","Tissues","Hand Sanitizer"]}]';
    // const data = JSON.parse(json);
    // console.log(data)
    // const firstName = data.find(item => item.name === 'firstName').value;
    // console.log(firstName)
    // const lastName = data.find(item => item.name === 'lastName').value;
    // console.log(lastName)
    // const phone = data.find(item => item.name === 'phone').value;
    // console.log(phone)
    // const email = data.find(item => item.name === 'email').value;
    // console.log(email)
    // const street = data.find(item => item.name === 'street').value;
    // console.log(street)
    // const city = data.find(item => item.name === 'city').value;
    // console.log(city)
    // const state = data.find(item => item.name === 'state').value;
    // console.log(state)
    // const other = data.find(item => item.name === 'other').value;
    // console.log(other)
    // const volunteer = data.find(item => item.name === 'volunteer').value;
    // console.log(volunteer)
    // const list = data.find(item => item.name === 'list').value.join(', ');
    // console.log(list)
  });

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