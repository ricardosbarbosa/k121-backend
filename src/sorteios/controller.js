const findAll = async ({ Sorteio }, req, res) => {
  try {
    const sorteios = await Sorteio.find({})
    res.json(sorteios)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
}

const update = async ({ Sorteio }, req, res) => {
  try {
    await Sorteio.updateOne({ _id: req.params.sorteioId }, req.body, { new: true })
    const sorteio = await Sorteio.findOne({ _id: req.params.sorteioId })
    res.json(sorteio)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
}
const destroy = async ({ Sorteio }, req, res) => {
  try {
    await Sorteio.deleteOne({ _id: req.params.sorteioId })
    res.json()
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
}

const create = async ({ Sorteio }, req, res) => {
  try {
    const sorteio = await Sorteio.create(req.body)
    res.json(sorteio)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
}

const test = async ({ Sorteio }, req, res) => {
  try {
    const sorteio = await Sorteio.findOne({ _id: req.params.sorteioId })
    let result = await sorteio.test()
    res.json(result)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
}

const result = async ({ Sorteio, utils }, req, res) => {
  try {
    const sorteio = await Sorteio.findOne({ _id: req.params.sorteioId })
    const result = await sorteio.perform()

    result.forEach((member, i) => {
      const secretFriend = i === result.length - 1 ? result[0] : result[i + 1]
      const emailData = utils.mailgunData(member, secretFriend)
      utils.sendEmailWithMailgun(emailData)
    })
    res.json()
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
}

module.exports = {
  findAll,
  update,
  create,
  destroy,

  test,
  result
}
