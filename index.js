require("dotenv").config();
const { PORT } = require("./constants");

const express = require('express')
const cors = require("cors");

const app = express();

//middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.json({ extended: true }));
app.use(cors({ credentials: true })); 

//routers 
const { router: friendsRouter } = require("./sorteios");
app.use("/sorteios", friendsRouter);

//database
const onceOpen = require('./database')
onceOpen(() => {
  app.listen(PORT, () => {
    console.log(`Listening http on ${PORT}...`);
  });
})
