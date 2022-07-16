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
      type: Number,
      required: true,
  },
  current_money: {
      type: Number,
      required: true,
      default: 0
  },
  status: {
      type: String,
      required: true,
      default: "DANG GAY QUY"// DAT CHI TIEU || HOAN THANH GAY QUY, 
  },
  proofImg: {
      type: String
  }
});

const Receiver = mongoose.model('Receiver', receiverSchema);
module.exports = Receiver;
