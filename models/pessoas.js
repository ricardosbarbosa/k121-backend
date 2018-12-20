var mongoose = require("mongoose");
Schema = mongoose.Schema;

const PessoaSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },

  amigo: { type: Schema.Types.ObjectId, ref: 'Pessoa' },
});

PessoaSchema.pre("find", function () {
  this.select("-__v -token");
});

const Pessoa = mongoose.model("Pessoa", PessoaSchema);
module.exports = Pessoa