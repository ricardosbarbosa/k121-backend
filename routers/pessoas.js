
const express = require('express')
const controller = require('../controllers/pessoas')
const models = require('../models/')
const router = express.Router()

var api_key = process.env.MAIL_GUN_API_KEY;
var domain = process.env.MAIL_GUN_DOMAIN;
var mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });

//dependencias 
const dependencias = {
  ...models,
  mailgun
};

router.get('/', controller.findAll.bind(null, dependencias))
router.get('/:id', controller.find.bind(null, dependencias))
router.post('/', controller.create.bind(null, dependencias))
router.put('/:id', controller.update.bind(null, dependencias))
router.delete('/:id', controller.remove.bind(null, dependencias))
router.post("/sorteio", controller.sorteio.bind(null, dependencias));
module.exports = router