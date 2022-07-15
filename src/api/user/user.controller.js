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
        let DTO=await userService.getDonation(req.body.receiverId);
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
    getDonation
}
