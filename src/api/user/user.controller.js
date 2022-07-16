const userService = require('./user.service')
const ErrorResponse = require("../../../utils/errorResponse");

//[GET] api/user/
async function getUser (req, res, next) {
    try {
        let DTO=await userService.getUser(req.userId);
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

//[GET] api/user/block/:id
async function getBlock (req, res, next) {
    try {
        let DTO=await userService.getBlock(req.params.id);
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


//[POST] api/user/donation
async function postDonation (req, res, next) {
    try {
        let DTO=await userService.postDonation(req.userId, req.body);
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
async function getDonation (req, res, next) {
    try {
        let DTO=await userService.getDonation(req.params.id);
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

//[GET] api/user/receiver/:id
async function getReceiver (req, res, next) {
    try {
        let DTO=await userService.getReceiver(req.params.id);
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

//[GET] api/user/all-receiver
async function getReceivers (req, res, next) {
    try {
        let DTO=await userService.getReceivers();
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

//[GET] api/user/history
async function getHistory (req, res, next) {
    try {
        let DTO=await userService.getHistory(req.userId);
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

async function updateUser (req, res, next) {
    try {
        let DTO=await userService.updateUser(req.userId, req.body);
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

//[POST] api/user/voucher
async function postVoucher (req, res, next) {
    try {
        let DTO=await userService.postVoucher(req.userId, req.body.voucher_id);
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
        let DTO=await userService.getVoucher(req.userId);
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

async function getCertificate (req, res, next) {
    try {
        let DTO=await userService.getCertificate(req.params.id);
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

async function vnpayPayment(req, res, next) {
    try {
        let DTO=await userService.vnpayPayment(req);
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

async function vnpayIpn(req, res, next) {
    try {
        let DTO=await userService.vnpayIpn(req.userId, req);
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

async function postMoney (req, res, next) {
    try {
        let DTO=await userService.postMoney(req.userId, req.body.money);
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

    getUser,
    postDonation,
    getDonation,
    getHistory,
    updateUser,
    postVoucher,
    getVoucher,
    getCertificate,
    vnpayPayment,
    vnpayIpn,
    postMoney,
    getReceivers,
    getReceiver,
    getBlock
}
