const SparkPost = require("sparkpost");
const client = new SparkPost(process.env.SPARKPOST);

exports.handler = function(event, context, callback) {
  console.log(event.body)
  // console.log(event.body.payload.data)

  callback(null, {statusCode: 200, body: JSON.stringify({ msg: 'done' })});

  // client.transmissions.send({
  //   options: {
  //     sandbox: false
  //   },
  //   content: {
  //     from: "COVIDHEROES.<form@mail.covidheroes.gives>",
  //     subject: "New donation form submitted",
  //     html:
  //       "<html><body><p>Testing SparkPost - the world's most awesomest email service!</p></body></html>"
  //   },
  //   recipients: [{ address: "arnaudcrowther@gmail.com" }]
  // })
  // .then(data => {
  //   console.log(data);
  //   callback(null, {
  //     statusCode: 200,
  //     body: JSON.stringify({ msg: data })
  //   });
  // })
  // .catch(err => {
  //   console.log(err);
  //   callback(null, {
  //     statusCode: 500,
  //     body: JSON.stringify({ msg: err })
  //   });
  // });
};
