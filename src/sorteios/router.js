
const express = require('express')
const controller = require('./controller')
const Member = require('../members/model')
const Sorteio = require('./model')
const router = express.Router()

const utils = require('../utils/index')
const membersRouter = require('../members/router')

const dependencies = {
  Member,
  Sorteio,
  utils
}

router.get('/', controller.findAll.bind(null, dependencies))
router.post('/', controller.create.bind(null, dependencies))
router.put('/:sorteioId', controller.update.bind(null, dependencies))
router.delete('/:sorteioId', controller.destroy.bind(null, dependencies))

router.get('/:sorteioId/test', controller.test.bind(null, dependencies))
router.post('/:sorteioId/result', controller.result.bind(null, dependencies))

router.use('/:sorteioId/members', membersRouter)

module.exports = router
