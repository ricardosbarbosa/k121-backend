var mongoose = require("mongoose");
Schema = mongoose.Schema;

const MemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  sorteio: { type: Schema.Types.ObjectId, ref: 'Sorteio' },
});

MemberSchema.index({ email: 1, sorteio: 1 }, { unique: true });

MemberSchema.pre("find", function () {
  this.select("-__v -token");
});

const Member = mongoose.model("Member", MemberSchema);
module.exports = Member