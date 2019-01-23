const shuffle = require("./shuffle");
const api_key = process.env.MAIL_GUN_API_KEY;
const domain = process.env.MAIL_GUN_DOMAIN;
const mailgunJs = require("mailgun-js")({ apiKey: api_key, domain: domain });;
const mailgun = require("./mailgun")(mailgunJs);

module.exports = {
  ...shuffle,
  ...mailgun
}