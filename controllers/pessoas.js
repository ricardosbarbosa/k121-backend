//crud de pessoa
const find = async ({ Pessoa }, req, res, next) => {
  try {
    const pessoa = await Pessoa.findOne({ _id: req.params.id });
    res.json(pessoa);
  } catch (error) {
    res.status(500).json({ error })
  }
};

const findAll = async ({ Pessoa }, req, res, next) => {
  try {
    const pessoas = await Pessoa.find({});
    res.json(pessoas);
  } catch (error) {
    res.status(500).json({ error })
  }
};

const create = async ({ Pessoa }, req, res, next) => {
  try {
    const pessoa = new Pessoa({ ...req.body, hash: req.body.email });
    await pessoa.save();
    
    res.json(pessoa);
  } catch (error) {
    console.log(error);

    res.status(500).json({ error });
  }
};

const update = async ({ Pessoa }, req, res, next) => {
  try {
    console.log("update");
    
    await Pessoa.updateOne({ _id: req.params.id }, req.body, { new: true });
    const pessoa = await Pessoa.findOne({ _id: req.params.id });
    res.status(200).json(pessoa)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error });
  }
};

const remove = async ({ Pessoa }, req, res, next) => {
  try {
    await Pessoa.deleteOne({ _id: req.params.id });
    res.status(200).json(req.params.id);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const sorteio = async ({ Pessoa, mailgun}, req, res, next) => {
  try {
    
    let pessoas = await Pessoa.find({});
    console.log(pessoas.map(p => p.nome));

    const n = pessoas.length
    for (i = 0; i < pessoas.length; i++) {
      const j = i + Math.floor(Math.random() * (n - i));
      const temp = pessoas[i];
      pessoas[i] = pessoas[j];
      pessoas[j] = temp;
    }

    console.log(pessoas.map(p => p.nome));

    pessoas.map(async (p,i) => {
      let amigosecreto = i === pessoas.length - 1 ? pessoas[0] : pessoas[i + 1];
      p.amigo = amigosecreto._id
      await Pessoa.updateOne({ _id: p._id }, p, { new: true });
      
      mailgun.messages().send(mailgunData(p, amigosecreto));
      return p
    })
    

    const list = await Pessoa.find({});
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ error });
  }
};

var mailgunData = (pessoa, amigosecreto) => ({
  from: "Excited User <me@samples.mailgun.org>",
  to: pessoa.email,
  subject: `${pessoa.nome} -> ${amigosecreto.nome}`,
  text: "Hello, seu amigo secreto é..." + amigosecreto.nome
});


module.exports = {
  find,
  findAll,
  create,
  update,
  remove,
  sorteio
};