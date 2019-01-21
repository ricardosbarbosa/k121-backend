var api_key = process.env.MAIL_GUN_API_KEY;
var domain = process.env.MAIL_GUN_DOMAIN;
var mailgun = require("mailgun-js")({ apiKey: api_key, domain: domain });

const sendEmail = async (data) => {
  return mailgun
    .messages()
    .send(data);
};

module.exports = {
  sendEmail
};