const mongoose=require('mongoose')
const Schema=mongoose.Schema

const voucherSchema=new Schema({
    voucher_code: {
        type: Array,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
    },
    supplier_name: {
        type: String,
        required: true,
    },
    point_cost: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

const Voucher=mongoose.model('Voucher', voucherSchema);

module.exports=Voucher;