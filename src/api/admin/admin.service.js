const User = require("../../models/User");
const Transaction = require("../../models/Transaction");
const Block = require("../../models/Block");
const Receiver = require("../../models/Receiver");
const Supplier = require("../../models/Supplier");
const Voucher = require("../../models/Voucher");


async function postReiver(req) {
    const {image, title, content, max_money} = req;

    const newReceiver = new Receiver({
        title, 
        content,
        max_money
    });

    try {
        await newReceiver.save();
        return {
            error: false,
            message: "Tạo supplier thành công"
        }

    }
    catch (err) {
        return {
            error: true,
            message: err.message,
        }
    }
}


async function addSupplier(reqSupplier){
    const {supplier_name, image} = reqSupplier;
    console.log(1);
    const newSupplier = new Supplier({
        supplier_name,
        image,
    });

    try {
        await newSupplier.save();
        return {
            error: false,
            message: "Tạo supplier thành công"
        }

    }
    catch (err) {
        return {
            error: true,
            message: err.message,
        }
    }
}

async function getSuppliers(page){
    try {
        
        const suppliers = await Supplier.find().sort({ _id: -1 })
        return {
            error: false,
            message: `Lấy suppliers thành công`,
            suppliers
        }
    }
    catch (err) {
        return {
            error: true,
            message: err.message,
        }
    }
}

async function addVoucher(reqVoucher){
    const {description, category, supplier_name, point_cost, image} = reqVoucher;

    const newVoucher = new Voucher({
        description,
        category,
        supplier_name,
        point_cost,
        image
    });

    try {
        await newVoucher.save();
        return {
            error: false,
            message: "Tạo voucher thành công"
        }

    }
    catch (err) {
        return {
            error: true,
            message: err.message,
        }
    }
}

async function addVoucherCode(reqVoucherCode, reqVoucherId ){
    try {
        console.log(reqVoucherCode)
        console.log(reqVoucherId)
        let voucher = await Voucher.findById(reqVoucherId);

        if(!voucher) { 
            return {
                error: true,
                message: 'Không tìm thấy voucher này'
            }
        }

        let oldCodes = voucher.voucher_code;
        let newCodes =[];
        for(let i = 0; i < oldCodes.length; i++)                    
        {
            newCodes.push(oldCodes[i]);
        }
        newCodes.push(reqVoucherCode);
        voucher.voucher_code = newCodes;
        console.log(voucher)
        await voucher.save()

        return {
            error: false,
            message: "Thêm mã voucher thành công"
        }

    }
    catch (err) {
        return {
            error: true,
            message: err.message,
        }
    }
}

async function getVouchers(page){
    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
    
        const total = await Voucher.countDocuments();
        const vouchers = await Voucher.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
        return {
            error: false,
            message: `Lấy voucher trang ${page} thành công`,
            current_page: Number(page),
            number_of_pages: Math.ceil(total / LIMIT),
            vouchers
        }
    }
    catch (err) {
        return {
            error: true,
            message: err.message,
        }
    }
}

async function getVouchersBySearch(searchKey){
    try {
        const description = new RegExp(searchKey, "i");

        const vouchers = await Voucher.find({ description });

        return {
            error: false,
            message: `Search voucher thành công`,
            vouchers
        }
    }
    catch (err) {
        return {
            error: true,
            message: err.message,
        }
    }
}

async function getVouchersByCategory(category){
    try {
        console.log(category)
        const vouchers = await Voucher.find({ category: category });

        return {
            error: false,
            message: `Lấy voucher ${category} thành công`,
            vouchers,
        }
    }
    catch (err) {
        return {
            error: true,
            message: err.message,
        }
    }
}

async function getVoucher(voucherId) {
    try {    
        const voucher = await Voucher.findById(voucherId)

        if(!voucher)
        {
            return {
                error: true,
                message: "Không tìm thấy voucher"
            }
        }
        
        return {
            error: false,
            message: "Lấy thành công voucher",
            voucher: {
                description: voucher.description,
                category: voucher.category,
                supplier_name: voucher.supplier_name,
                point_cost: voucher.point_cost,
                image: voucher.image,
            }
        }
    }
    catch(err) {
        return {
            err: true,
            message: err.message
        }
    }
}

async function updateVoucher(voucherId, reqVoucherInfo) {
    try {
        const description = reqVoucherInfo.description;
        const category = reqVoucherInfo.category;
        const supplier_name = reqVoucherInfo.supplier_name;
        const point_cost = reqVoucherInfo.point_cost;
        const image = reqVoucherInfo.image;

        const voucher = await Voucher.findById(voucherId)
        if(!voucher)
        {
            return {
                error: true,
                message: "Không tìm thấy voucher"
            }
        }

        const updatedVoucher = await Voucher.findByIdAndUpdate(
            voucherId,
            {
                description: description,
                category: category,
                supplier_name: supplier_name,
                point_cost: point_cost,
                image: image,
            },
        )
        
        return {
            error: false,
            message: "Update thành công voucher",
        }
    }
    catch(err) {
        return {
            err: true,
            message: err.message
        }
    }
}

async function deleteVoucher(voucherId) {
    try {    
        const voucher = await Voucher.findById(voucherId)
        if(!voucher)
        {
            return {
                error: true,
                message: "Không tìm thấy voucher"
            }
        }

        const deletedVoucher = await Voucher.findByIdAndDelete(voucherId)
        
        return {
            error: false,
            message: "Xóa thành công voucher",
        }
    }
    catch(err) {
        return {
            err: true,
            message: err.message
        }
    }
}


module.exports= {

    postReiver,
    addSupplier,
    getSuppliers,
    addVoucher,
    addVoucherCode,
    getVouchers,
    getVouchersBySearch,
    getVouchersByCategory,
    getVoucher,
    updateVoucher,
    deleteVoucher
}
