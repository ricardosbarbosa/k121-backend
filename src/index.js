require("dotenv").config();
const { PORT } = require("./constants");

const app = require('./app')

//database
const { mongoose } = require('./database')

var db = mongoose.connection;
db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Listening http on ${PORT}...`);
  });
});


