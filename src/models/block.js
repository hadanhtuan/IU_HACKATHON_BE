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
    default: Date.now()
  }
});

blockSchema.methods.calculateHash = function () {

  this.hash = crypto
  .createHash('sha256')
  .update(this.previousHash + this.timestamp + JSON.stringify(this.transaction))
  .digest('hex');

};



const Block = mongoose.model('Block', blockSchema);
module.exports = Block;
