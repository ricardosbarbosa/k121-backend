const findAll = async ({Sorteio}, req, res) => {
  try {
    const sorteios = await Sorteio.find({});
    res.status(200).json(sorteios);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
const find = async ({Sorteio}, req, res) => {
  try {
    const sorteio = await Sorteio.findOne({ _id: req.params.id });
    res.status(200).json(sorteio);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
const update = async ({Sorteio}, req, res) => {
  try {
    const sorteio = await Sorteio.updateOne({ _id: req.params.id }, req.body, { new: true });
    res.status(200).json(sorteio);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
const destroy = async ({Sorteio}, req, res) => {
  try {
    await Sorteio.deleteOne({ _id: req.params.id });
    res.status(200).json()
  } catch (error) {
    console.log(error);
    res.status(500).json({ error })
  }
}

const create = async ({ Sorteio }, req, res) => {
  try {
    const sorteio = new Sorteio(req.body);
    await sorteio.save();
    res.status(200).json(sorteio);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

const test = async ({ Sorteio }, req, res) => {
  try {
    const sorteio = await Sorteio.findOne({ _id: req.params.id });
    let result = await sorteio.test()
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

const result = async ({ Sorteio, mailgun, utils}, req, res) => {
  try {
    const sorteio = await Sorteio.findOne({ _id: req.params.id });
    const result = await sorteio.perform();
    
    result.forEach((member, i) => {
      const secretFriend = i === result.length - 1 ? result[0] : result[i + 1];
      const emailData = utils.mailgunData(member, secretFriend);
      mailgun.sendEmail(emailData);
    });
    res.status(200).json();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

module.exports = {
  find,
  findAll,
  update,
  create,
  destroy,

  test, 
  result,
};