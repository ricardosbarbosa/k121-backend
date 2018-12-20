require("dotenv").config();

const express = require('express')
const app = express()
const cors = require("cors");

//contants 
const PORT = process.env.PORT || 3001;
const HOSTNAME = process.env.HOSTNAME || "localhost";
const DB_HOST = process.env.DB_HOST;

//middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.json({ extended: true }));

app.use(cors({ credentials: true })); 

//routes 
const pessoasRouter = require('./routers/pessoas')
app.use("/pessoas", pessoasRouter);

//dicomove db
const mongoose = require("mongoose");
mongoose.Promisse = global.Promise;

mongoose.connect(DB_HOST, { useNewUrlParser: true });
var db = mongoose.connection;
mongoose.set('useCreateIndex', true)

db.on("error", (a, b) => console.log("connection error:", a, b));
db.once("open", function () {
  console.log("we're connected!");
  app.listen(PORT, () => {
    console.log(`Listening http on ${PORT}...`);
  });
});
