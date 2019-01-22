const shuffle = require("./shuffle");
const mailgun = require("./mailgun");

module.exports = {
  ...shuffle,
  ...mailgun
}