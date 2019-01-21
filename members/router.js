
const express = require('express')
const controller = require('./controller')
const member = require('./member')
const router = express.Router({ mergeParams: true })

//dependencias 
const dependencias = {
  Member: member,
};

router.get('/', controller.findAll.bind(null, dependencias))
router.post('/', controller.create.bind(null, dependencias))
router.put('/:id', controller.update.bind(null, dependencias))
router.delete('/:id', controller.remove.bind(null, dependencias))

module.exports = router