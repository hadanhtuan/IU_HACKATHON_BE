const mongoose=require('mongoose')
const Schema=mongoose.Schema

const supplierSchema=new Schema({
    supplier_name:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    }
});

const Supplier=mongoose.model('Supplier', supplierSchema);

module.exports=Supplier;