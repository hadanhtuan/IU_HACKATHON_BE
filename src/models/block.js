const mongoose = require('mongoose');
const crypto = require('crypto');

const { Schema } = mongoose;

const blockSchema = new Schema({
  previousHash : {
    type: String,
    required: true,
  },
  transactionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Transaction',
    required: true,
  },
  hash: {
    type: String,
    required: true,
  },
  timestamp : {
    type: String,
    required: true,
    default: new Date()
  },
  mineVar: {
    type: Number,
    required: true,
    default: 0
  }
});

blockSchema.methods.calculateHash = function () {

  return crypto
  .createHash('sha256')
  .update(this.previousHash + this.timestamp + JSON.stringify(this.transaction)+this.mineVar)
  .digest('hex');

};





const Block = mongoose.model('Block', blockSchema);
module.exports = Block;
