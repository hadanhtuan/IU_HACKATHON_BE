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



module.exports= {

    postReiver
}
