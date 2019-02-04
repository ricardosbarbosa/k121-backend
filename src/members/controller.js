const findAll = async ({ Member }, req, res) => {
  try {
    const members = await Member.find({ sorteio: req.params.sorteioId })
    res.json(members)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
}

const create = async ({ Member }, req, res) => {
  try {
    const member = await Member.create({ ...req.body })
    res.json(member)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
}

const update = async ({ Member }, req, res) => {
  try {
    await Member.updateOne({ _id: req.params.memberId }, req.body, { new: true })
    const member = await Member.findOne({ _id: req.params.memberId })
    res.json(member)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
}

const destroy = async ({ Member }, req, res) => {
  try {
    await Member.deleteOne({ _id: req.params.memberId })
    res.json()
  } catch (error) {
    res.status(500).json({ error })
  }
}

module.exports = {
  findAll,
  create,
  update,
  destroy
}
