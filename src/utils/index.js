const shuffle = require('./shuffle')
const apiKey = process.env.MAIL_GUN_API_KEY
const domain = process.env.MAIL_GUN_DOMAIN
const mailgunJs = require('mailgun-js')({ apiKey: apiKey, domain: domain })
const mailgun = require('./mailgun')(mailgunJs)

module.exports = {
  ...shuffle,
  ...mailgun
}
