const SparkPost = require("sparkpost");
const client = new SparkPost(process.env.SPARKPOST);
const receiver = "arnaudcrowther@gmail.com";

exports.handler = function(event, context, callback) {
  const data = JSON.parse(event.body);
  const firstName = data.find(item => item.name === 'firstName').value;
  const lastName = data.find(item => item.name === 'lastName').value;
  const phone = data.find(item => item.name === 'phone').value;
  const email = data.find(item => item.name === 'email').value;
  const street = data.find(item => item.name === 'street').value;
  const city = data.find(item => item.name === 'city').value;
  const state = data.find(item => item.name === 'state').value;
  const other = data.find(item => item.name === 'other').value;
  const volunteer = data.find(item => item.name === 'volunteer');
  const list = data.find(item => item.name === 'list').value.join(', ');

  client.transmissions.send({
    options: {
      sandbox: false
    },
    content: {
      from: "COVIDHEROES.<form@mail.covidheroes.gives>",
      subject: "New donation form submitted",
      html:`
        <html><body>
          <h2>New form submission</h2>
          <table style="width:100%">
          <tr>
            <td>First name</td>
            <td>${firstName}</td>
          </tr>
          <tr>
            <td>Last name</td>
            <td>${lastName}</td>
          </tr>
          <tr>
            <td>Phone</td>
            <td>${phone}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>${email}</td>
          </tr>
          <tr>
            <td>Address</td>
            <td>${street}</td>
          </tr>
          <tr>
            <td>City</td>
            <td>${city}</td>
          </tr>
          <tr>
            <td>State</td>
            <td>${state}</td>
          </tr>
          <tr>
            <td>Donation items</td>
            <td>${list}</td>
          </tr>
          <tr>
            <td>Other items</td>
            <td>${other}</td>
          </tr>
          <tr>
            <td>Volunteer</td>
            <td>${volunteer ? volunteer.value : 'false'}</td>
          </tr>
          </table>
        </body></html>
      `
    },
    recipients: [{ address: receiver }]
  })
  .then(data => {
    console.log(data);
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({ msg: data })
    });
  })
  .catch(err => {
    console.log(err);
    callback(null, {
      statusCode: 500,
      body: JSON.stringify({ msg: err })
    });
  });
};
