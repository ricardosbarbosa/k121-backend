
const mongoose = require("mongoose");
mongoose.Promisse = global.Promise;
const { DB_HOST, DB_HOST_TEST } = require("./constants");

mongoose.connect( DB_HOST, { useNewUrlParser: true });
mongoose.set("useCreateIndex", true);

module.exports = {
  mongoose,
  connect: () => {
    mongoose.Promise = Promise;
    mongoose.connect(DB_HOST_TEST, { useNewUrlParser: true } );
  },
  disconnect: (done) => {
    mongoose.disconnect(done);
  },
};