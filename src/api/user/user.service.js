const User = require("../../models/User");
const Receiver = require("../../models/Receiver");
const Transaction = require("../../models/Transaction");
const Voucher = require("../../models/Voucher");
const Block = require("../../models/Block");


async function getUser(userId) {
    try {
        const user = await User.findById(userId)
        if(!user)
        {
            return {
                error: true,
                message: "Khong tim thay user"
            }
        }

        return {
            error: false,
            message: "Tim thay user",
            _id: user._id,
            email: user.email,
            fullname: user.fullname,
            cmnd_t: user.cmnd_t,
            cmnd_s: user.cmnd_s,
            wallet_balance: user.wallet_balance,
            point: user.point,
            vouchers_list: user.vouchers_list,
            role: user.role
        }
    }
    catch(err) {
        return {
            err: true,
            message: err.message
        }
    }
}

async function getReceiver(id) {
    try {
        const receiver = await Receiver.findById(id)
        if(!receiver)
        {
            return {
                error: true,
                message: "Khong tim thay receiver"
            }
        }

        return {
            receiver
        }
    }
    catch(err) {
        return {
            err: true,
            message: err.message
        }
    }
}


async function getReceivers() {
    try {
        const receivers = await Receiver.find({})

        return {
            receivers: receivers
        }
    }
    catch(err) {
        return {
            err: true,
            message: err.message
        }
    }
}


async function postDonation(userId, reqDonation){
    try {
        let user = await User.findOne({ _id: userId });
        
        const newTransaction = new Transaction( {
            from: userId,
            to: reqDonation.receiverId,
            amount: parseInt(reqDonation.amount) 
        })

        let point = 0;

        if(user.wallet_balance < reqDonation.amount){
            return {
                error: true,
                message: "Không đủ tiền để thực hiện giao dịch"
            }
        }

        user.wallet_balance -= reqDonation.amount;
        point += Math.floor(reqDonation.amount/1000);
        user.point += point;

        let trans  = await Transaction.find({to: reqDonation.receiverId}).sort({_id:-1}).limit(1)
        console.log(trans[0])

        let lastBlock
        await newTransaction.save();

        if(trans[0]) {
            lastBlock = await Block.find({transactionId: trans[0]._id}).sort({_id:-1}).limit(1)
            console.log('last block', lastBlock)
        }

        console.log(!trans[0])
        if(!lastBlock) {
            console.log(1)
            const newBlock1 = new Block({
                transactionId: newTransaction._id,
                previousHash: "00000"
            });
            newBlock1.calculateHash();
            newBlock1.save();
        }
        else {
            console.log(22)

            const newBlock2 = new Block({
                transactionId: newTransaction._id,
                previousHash: lastBlock[0].hash
            });
            newBlock2.calculateHash();
            newBlock2.save();
        }

        


        //update receiver
        const receiver = await Receiver.findOne({_id: reqDonation.receiverId})

        receiver.current_money+=parseInt(reqDonation.amount);
        if(receiver.current_money >= receiver.max_money)  
            receiver.status = "DAT CHI TIEU"

        receiver.save();

        user.save();
          
        return {
            error: false,
            message: "Quyên góp thành công, chia sẻ để nhận thêm điểm"
        }
    }   

    catch(err) {
        return {
            error: true,
            message: err,
        }
    }
}

async function getDonation(receiverId){
    try {
        console.log(receiverId)
        let allBlock = await Block.aggregate([
            {
                $lookup: {
                    from: 'transactions',
                    localField: 'transactionId',
                    foreignField: '_id',
                    as: 'transaction'
                }
            },
            {
                $match: {
                    'transaction': {$ne: []}
                }
            }
        ])
        let blockChain = []
        for(let block of allBlock) {
            if(block.transaction[0].to.valueOf() == receiverId) {
                const user = await User.find({_id: block.transaction[0].from})
                const receiver = await Receiver.find({_id: block.transaction[0].to})
                
                block.transaction[0].from = user[0]
                block.transaction[0].to = receiver[0] 
                let newBlock = { ...block, transaction: block.transaction[0]}
                
                delete newBlock.__v
                newBlock.transaction.from.wallet_balance = null                    

                blockChain.push(newBlock)
            }
        }
        

       // console.log(blockChain)
        return {
            blockChain
        }

    }
    catch(err) {
        return {   
            error: true,
            message: err.message,
        }
    }
}

async function getHistory(userId) {
    try {
        let blocks = await Block.aggregate([
            {
                $lookup: {
                    from: 'transactions',
                    localField: 'transactionId',
                    foreignField: '_id',
                    as: 'transaction'
                }
            },
            {
                $match: {
                    'transaction': {$ne: []}
                }
            }
        ])
       // console.log(blocks)
        let newBlocks = []
        for(let block of blocks) {
        //    console.log(block.transaction[0].from.valueOf())
            if(block.transaction[0].from.valueOf() == userId) {
                let newBlock = { ...block, transaction: block.transaction[0]}
                
                delete newBlock.__v
                newBlocks.push(newBlock)
            }
        }
        return {
            history: newBlocks
        }

    }
    catch(err) {
        return {   
            error: true,
            message: err.message,
        }
    }
}

async function updateUser(userId, reqUserInfo) {
    try {
        const email = reqUserInfo.email;
        const fullname = reqUserInfo.fullname;
        const phonenumber = reqUserInfo.phonenumber;
        const cmnd = reqUserInfo.cmnd;

        const user = await User.findById(userId)
        if(!user)
        {
            return {
                error: true,
                message: "Khong tim thay user"
            }
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId, 
            {
                email: email,
                fullname: fullname,
                phonenumber: phonenumber,
                cmnd: cmnd
            }, 
        )
        
        return {
            error: false,
            message: "Update thành công user",
        }
    }
    catch(err) {
        return {
            err: true,
            message: err.message
        }
    }
}

async function postVoucher(userId, voucher_id){
    try {
        let user = await User.findById(userId);
        let voucher = await Voucher.findOne({ _id: voucher_id })
        if(!user) { 
            return {
                error: true,
                message: 'Không tìm thấy người dùng'
            }
        }

        if(!voucher) {
            return {
                error: true,
                message: 'Không tìm thấy voucher'
            }
        }

        if(user.point < voucher.point_cost){
            return {
                error: true,
                message: 'Không đủ điểm để đổi lấy voucher'
            }
        }

        if(voucher.voucher_code.length <= 0){
            return {
                error: true,
                message: 'Voucher đã hết số lượng'
            }
        }

        let oldVoucherCodes = voucher.voucher_code;
        let voucherCode = oldVoucherCodes[0];
        oldVoucherCodes.shift();

            let oldVouchers = user.vouchers_list;
            let newVouchers =[];
            for(let i = 0; i < oldVouchers.length; i++)                    
            {
                newVouchers.push(oldVouchers[i]);
            }
            newVouchers.push({
                voucher_code: voucherCode,
                descripion: voucher.descripion,
                category: voucher.category,
                supplier_name: voucher.supplier_name,
                point_cost: voucher.point_cost,
                image: voucher.image
            });
            
            voucher.voucher_code = oldVoucherCodes;
            user.vouchers_list = newVouchers;

            user.point -= voucher.point_cost;
            await voucher.save()
            await user.save()

        return {
            error: false,
            message: "Thêm voucher thành công"
        }
    }   

    catch(err) {
        return {
            error: true,
            message: err.message,
        }
    }
}

async function getVoucher(userId){
    try {
        let user = await User.findById(userId);
        if(!user){    
            return {
                error: true,
                message: 'Không tìm thấy người dùng'
            }
        }

        let vouchersList = user.vouchers_list;

        return {
            error: false,
            message: "Lấy danh sách quyên góp thành công",
            vouchersList,
        }
    }
    catch(err) {
        return {   
            error: true,
            message: err.message,
        }
    }
}

async function postMoney(userId, money){
    try {
        let user = await User.findById(userId);
        if(!user) { 
            return {
                error: true,
                message: 'Không tìm thấy người dùng'
            }
        }
            user.wallet_balance += money;
            await user.save()

        return {
            error: false,
            message: "Nạp tiền thành công"
        }
    }   

    catch(err) {
        return {
            error: true,
            message: err.message,
        }
    }
}

async function getCertificate(cerId) {
    try {

        const certificate = await Certificate.findById(cerId)
        if(!cerId)
        {
            return {
                error: true,
                message: "Khong tim thay chung chi"
            }
        }
        
        return {
            error: false,
            message: "Lay chung chi thành công",
            certificate: certificate
        }
    }

    catch(err) {
        return {
            err: true,
            message: err.message
        }
    }
}

async function vnpayPayment(req) {
    try {
        var ipAddr = '127.0.0.1'
        var tmnCode = 'XCGAYSB8';
        var secretKey = 'VRTQFJVDDZKRPJPNGKOEFLRDUYGQCWOG';
        var vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
        var returnUrl = encodeURIComponent('https://camonvidaden-cba2d.web.app/donepayment');

        var date = new Date();

        var dateFormat = require('dateformat');

        var createDate = dateFormat(date, 'yyyymmddHHmmss');
        var orderId = dateFormat(date, 'HHmmss');
        var amount = req.body.amount;
        
        var orderInfo = encodeURIComponent(req.body.orderDescription);
        var orderType = req.body.orderType;
        var locale = req.body.language;
        if(locale === null || locale === ''){
            locale = 'vn';
        }
        var currCode = 'VND';
        var vnp_Params_old = {};
        vnp_Params_old['vnp_Version'] = '2.1.0';
        vnp_Params_old['vnp_Command'] = 'pay';
        vnp_Params_old['vnp_TmnCode'] = tmnCode;
        // vnp_Params_old['vnp_Merchant'] = ''
        vnp_Params_old['vnp_Locale'] = locale;
        vnp_Params_old['vnp_CurrCode'] = currCode;
        vnp_Params_old['vnp_TxnRef'] = orderId;
        vnp_Params_old['vnp_OrderInfo'] = orderInfo;
        vnp_Params_old['vnp_OrderType'] = orderType;
        vnp_Params_old['vnp_Amount'] = amount * 100;
        vnp_Params_old['vnp_ReturnUrl'] = returnUrl;
        vnp_Params_old['vnp_IpAddr'] = ipAddr;
        vnp_Params_old['vnp_CreateDate'] = createDate;
        // if(bankCode !== null && bankCode !== ''){
        //     vnp_Params_old['vnp_BankCode'] = bankCode;
        // }

        const vnp_Params = Object.keys(vnp_Params_old).sort().reduce(
            (obj, key) => { 
              obj[key] = vnp_Params_old[key]; 
              return obj;
            }, 
            {}
        );

        var querystring = require('qs');
        var signData = querystring.stringify(vnp_Params, { encode: false });
        var crypto = require("crypto");     
        var hmac = crypto.createHmac("sha512", secretKey);
        var signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");
        vnp_Params['vnp_SecureHash'] = signed;
        vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

        console.log(vnp_Params)

        console.log(vnpUrl)

        return {
            err: false,
            message: 'Chuyển hướng thanh toán',
            vnpayUrl: vnpUrl,
        }
    }

    catch(err) {
        return {
            err: true,
            message: err.message
        }
    }
}

async function vnpayIpn(userId, req) {
    try {
        var vnp_Params_old = req.body;
        var secureHash = vnp_Params_old['vnp_SecureHash'];

        delete vnp_Params_old['vnp_SecureHash'];

        const vnp_Params = Object.keys(vnp_Params_old).sort().reduce(
            (obj, key) => { 
              obj[key] = vnp_Params_old[key]; 
              return obj;
            }, 
            {}
        );

        var secretKey = 'VRTQFJVDDZKRPJPNGKOEFLRDUYGQCWOG';
        var querystring = require('qs');
        var signData = querystring.stringify(vnp_Params, { encode: false });
        var crypto = require("crypto");     
        var hmac = crypto.createHmac("sha512", secretKey);
        var signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");     
        

        if(secureHash === signed){
            const transactionNo = vnp_Params['vnp_TransactionNo']
            const vnpay = await Vnpay.findOne({ vnp_TransactionNo: transactionNo })

            if(!vnpay){
                const user = await User.findById(userId)

                var orderId = vnp_Params['vnp_TxnRef'];
                var rspCode = vnp_Params['vnp_ResponseCode'];
                var money = vnp_Params['vnp_Amount']

                user.wallet_balance += parseInt(money)/100;

                const newVnpay = new Vnpay({
                    vnp_Amount: vnp_Params['vnp_Amount'],
                    vnp_BankCode: vnp_Params['vnp_BankCode'],
                    vnp_BankTranNo: vnp_Params['vnp_BankTranNo'],
                    vnp_CardType: vnp_Params['vnp_CardType'],
                    vnp_OrderInfo: vnp_Params['vnp_OrderInfo'],
                    vnp_TransactionNo: vnp_Params['vnp_TransactionNo'],
                    vnp_TmnCode: vnp_Params['vnp_TmnCode'],
                    vnp_PayDate: vnp_Params['vnp_PayDate']
                });

                newVnpay.save();
                user.save();

                return {
                    error: false,
                    message: "Thanh toán thành công",
                    paymentInfo: {
                        vnp_Amount: parseInt(vnp_Params['vnp_Amount'])/100,
                        vnp_BankCode: vnp_Params['vnp_BankCode'],
                        vnp_BankTranNo: vnp_Params['vnp_BankTranNo'],
                        vnp_CardType: vnp_Params['vnp_CardType'],
                        vnp_OrderInfo: vnp_Params['vnp_OrderInfo'],
                        vnp_PayDate: vnp_Params['vnp_PayDate']
                    },
                    userInfo:{
                        name: user.fullname,
                        email: user.email
                    }
                }

            } else {
                return {
                    error: true,
                    message: "Giao dịch đã được xử lí"
                }
            }
            
            
        }
        else {
            return {
                error: true,
                message: "Lỗi checksum"
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

async function getBlock(id) {
    try {
        let block = await Block.findById(id).populate({
            path: 'transactionId',
            populate: { path: 'from'},
          })
      
    
        const receiver = await Receiver.findById(block.transactionId.to) 
        block.transactionId.to = receiver

        if(!block) {
            return {
                err: true,
                message: "Khong ton tai"
            }
        }

        return {
            err: false,
            block
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

    getUser,
    postDonation,
    getDonation,
    getHistory,
    updateUser,
    postVoucher,
    getVoucher,
    postMoney,
    getCertificate,
    vnpayPayment,
    vnpayIpn,
    getReceivers,
    getReceiver,
    getBlock

}
