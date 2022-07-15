const mongoose = require('mongoose');
//const crypto = require('crypto');

const { Schema } = mongoose;

const receiverSchema = new Schema({
  image: {
    type: String
  },
  title: {
      type: String,
      required: true
  },
  content: {
      type: String,
      required: true,
  },
  max_money: {
      type: String,
      required: true,
  }
});

const Receiver = mongoose.model('Receiver', receiverSchema);
module.exports = Receiver;
