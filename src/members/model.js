var mongoose = require('mongoose')
const Schema = mongoose.Schema

const MemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  sorteio: { type: Schema.Types.ObjectId, ref: 'Sorteio' }
})

MemberSchema.index({ email: 1, sorteio: 1 }, { unique: true })

const Member = mongoose.model('Member', MemberSchema)
module.exports = Member
