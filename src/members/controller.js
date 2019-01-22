const findAll = async ({ Member }, req, res) => {
  try {
    const members = await Member.find({sorteio: req.params.id});
    res.json(members);
  } catch (error) {
    res.status(500).json({ error })
  }
};

const create = async ({ Member }, req, res) => {
  try {
    const member = new Member({ ...req.body, hash: req.body.email });
    await member.save();
    res.json(member);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

const update = async ({ Member }, req, res) => {
  try {
    await Member.updateOne({ _id: req.params.id }, req.body, { new: true });
    const member = await Member.findOne({ _id: req.params.id });
    res.status(200).json(member)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error });
  }
};

const remove = async ({ Member }, req, res) => {
  try {
    await Member.deleteOne({ _id: req.params.id });
    res.status(200).json(req.params.id);
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = {
  findAll,
  create,
  update,
  remove
};