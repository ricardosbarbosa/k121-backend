
const mongoose = require("mongoose");
mongoose.Promisse = global.Promise;
const { DB_HOST } = require('./constants')

mongoose.connect( DB_HOST, { useNewUrlParser: true });
var db = mongoose.connection;
mongoose.set("useCreateIndex", true);

module.exports = (done) => {
  db.once("open", done);
}


