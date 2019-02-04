
const express = require('express')
const controller = require('./controller')
const member = require('./model')
const router = express.Router({ mergeParams: true })

// dependencies
const dependencies = {
  Member: member
}

router.get('/', controller.findAll.bind(null, dependencies))
router.post('/', controller.create.bind(null, dependencies))
router.put('/:memberId', controller.update.bind(null, dependencies))
router.delete('/:memberId', controller.destroy.bind(null, dependencies))

module.exports = router
