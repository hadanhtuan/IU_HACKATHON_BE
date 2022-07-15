const User = require("../../models/User");
const Transaction = require("../../models/Transaction");
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
        let blockchain = await Block.aggregate([{$lookup: {
            from: 'categories',
            localField: 'category_id',
            foreignField: '_id',
            as: 'category'
        }}])

        console.log((blockchain))
        return {
            blockchain
        }

    }
    catch(err) {
        return {   
            error: true,
            message: err.message,
        }
    }
}

module.exports= {

    getUser,
    postDonation,
    getDonation

}
