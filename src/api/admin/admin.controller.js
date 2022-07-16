const adminService = require('./admin.service')
const ErrorResponse = require("../../../utils/errorResponse");

//[POST] api/admin/receiver
async function postReiver (req, res, next) {
    try {
        let DTO=await adminService.postReiver(req.body);
        if(DTO.error) 
        {
            return next(new ErrorResponse(DTO.message, 500));
        }
        res.status(200).json(DTO);
    }
    catch(err) {
        next(new ErrorResponse(err.message, 500));
    }
}

//[POST] api/admin/supplier
async function addSupplier (req, res, next) {
    console.log(2)
    try {
        let DTO=await adminService.addSupplier(req.body);
        if(DTO.error) 
        {
            return next(new ErrorResponse(DTO.message, 500));
        }
        res.status(200).json(DTO);
    }
    catch(err) {
        next(new ErrorResponse(err.message, 500));
    }
}

//[GET] api/admin/suppliers
async function getSuppliers (req, res, next) {
    try {
        let DTO=await adminService.getSuppliers();
        if(DTO.error) 
        {
            return next(new ErrorResponse(DTO.message, 500));
        }
        res.status(200).json(DTO);
    }
    catch(err) {
        next(new ErrorResponse(err.message, 500));
    }
}

//[GET] api/user/donation
async function addVoucher (req, res, next) {
    try {
        let DTO=await adminService.addVoucher(req.body);
        if(DTO.error) 
        {
            return next(new ErrorResponse(DTO.message, 500));
        }
        res.status(200).json(DTO);
    }
    catch(err) {
        next(new ErrorResponse(err.message, 500));
    }
}

async function addVoucherCode (req, res, next) {
    try {
        let DTO=await adminService.addVoucherCode(req.body.voucherCode, req.body.voucherId);
        if(DTO.error) 
        {
            return next(new ErrorResponse(DTO.message, 500));
        }
        res.status(200).json(DTO);
    }
    catch(err) {
        next(new ErrorResponse(err.message, 500));
    }
}

async function getVouchersBySearch (req, res, next) {
    try {
        let DTO=await adminService.getVouchersBySearch(req.query.searchKey);
        if(DTO.error) 
        {
            return next(new ErrorResponse(DTO.message, 500));
        }
        res.status(200).json(DTO);
    }
    catch(err) {
        next(new ErrorResponse(err.message, 500));
    }
}

async function getVouchersByCategory (req, res, next) {
    try {
        let DTO=await adminService.getVouchersByCategory(req.params.category);
        if(DTO.error) 
        {
            return next(new ErrorResponse(DTO.message, 500));
        }
        res.status(200).json(DTO);
    }
    catch(err) {
        next(new ErrorResponse(err.message, 500));
    }
}

async function getVouchers (req, res, next) {
    try {
        let DTO=await adminService.getVouchers(req.query.page);
        if(DTO.error) 
        {
            return next(new ErrorResponse(DTO.message, 500));
        }
        res.status(200).json(DTO);
    }
    catch(err) {
        next(new ErrorResponse(err.message, 500));
    }
}

async function getVoucher (req, res, next) {
    try {
        let DTO=await adminService.getVoucher(req.params.id);
        if(DTO.error) 
        {
            return next(new ErrorResponse(DTO.message, 500));
        }
        res.status(200).json(DTO);
    }
    catch(err) {
        next(new ErrorResponse(err.message, 500));
    }
}

async function updateVoucher (req, res, next) {
    try {
        let DTO=await adminService.updateVoucher(req.params.id, req.body);
        if(DTO.error) 
        {
            return next(new ErrorResponse(DTO.message, 500));
        }
        res.status(200).json(DTO);
    }
    catch(err) {
        next(new ErrorResponse(err.message, 500));
    }
}

async function deleteVoucher (req, res, next) {
    try {
        let DTO=await adminService.deleteVoucher(req.params.id);
        if(DTO.error) 
        {
            return next(new ErrorResponse(DTO.message, 500));
        }
        res.status(200).json(DTO);
    }
    catch(err) {
        next(new ErrorResponse(err.message, 500));
    }
}

module.exports= {

    postReiver,
    addSupplier,
    getSuppliers,
    addVoucher,
    getVouchers,
    addVoucherCode,
    getVouchersBySearch,
    getVouchersByCategory,
    getVoucher,
    updateVoucher,
    deleteVoucher
}
