const mongoose=require('mongoose')
const Schema=mongoose.Schema

const vnpaySchema=new Schema({
    vnp_Amount: {
        type: String,
        required: true
    },
    vnp_BankCode: {
        type: String,
        required: true
    },
    vnp_BankTranNo: {
        type: String,
        required: true,
    },
    vnp_CardType: {
        type: String,
        required: true,
    },
    vnp_OrderInfo: {
        type: String,
        required: true,
    },
    vnp_TransactionNo:{
        type: String,
        required: true,
    },
    vnp_TmnCode: {
        type: String,
        required: true
    },
    vnp_PayDate: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

const Vnpay=mongoose.model('Vnpay', vnpaySchema)
module.exports=Vnpay