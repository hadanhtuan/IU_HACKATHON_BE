const mongoose = require('mongoose');
//const crypto = require('crypto');

const { Schema } = mongoose;

const transactionSchema = new Schema({
  from: {     //user id
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  to: {      //receiver id
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Receiver',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  timestamp : {
    type: String,
    required: true,
    default: new Date()
  }
});



const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;
