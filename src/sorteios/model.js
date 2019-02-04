var mongoose = require('mongoose')
var utils = require('../utils/shuffle')

const Schema = mongoose.Schema

const SorteioSchema = new mongoose.Schema({
  name: { type: String, required: true },
  result: { type: String },
  members: [{ type: Schema.Types.ObjectId, ref: 'Member' }]
})

SorteioSchema.methods.test = function () {
  return new Promise((resolve, reject) => {
    try {
      this.model('Member')
        .find({ sorteio: this._id }, (error, result) => {
          if (error) { reject(error) }
          const shuffledMembers = utils.shuffleArray(result)
          resolve(shuffledMembers)
        })
    } catch (error) {
      reject(error)
    }
  })
}
SorteioSchema.methods.perform = function () {
  return new Promise((resolve, reject) => {
    try {
      this.model('Member')
        .find({ sorteio: this._id }, (error, result) => {
          if (error) { reject(error) }
          const shuffledMembers = utils.shuffleArray(result)
          this.result = shuffledMembers.map(m => m._id).join(',')
          this.save()
          resolve(shuffledMembers)
        })
    } catch (error) {
      reject(error)
    }
  })
}

const Sorteio = mongoose.model('Sorteio', SorteioSchema)
module.exports = Sorteio
