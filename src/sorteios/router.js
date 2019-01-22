
const express = require('express')
const controller = require('./controller')
const Member = require("../members/member");
const Sorteio = require("./model");
const router = express.Router()

const utils = require("../utils/index");
const membersRouter = require("../members/router");

const dependencies = {
  Member,
  Sorteio,
  utils
};

router.get("/", controller.findAll.bind(null, dependencies));
router.post("/", controller.create.bind(null, dependencies));
router.get("/:id", controller.find.bind(null, dependencies));
router.put("/:id", controller.update.bind(null, dependencies));
router.delete("/:id", controller.destroy.bind(null, dependencies));

router.get("/:id/test", controller.test.bind(null, dependencies));
router.post("/:id/result", controller.result.bind(null, dependencies));

router.use("/:id/members", membersRouter);

module.exports = router