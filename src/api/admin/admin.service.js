const User = require("../../models/User");
const Transaction = require("../../models/Transaction");
const Block = require("../../models/Block");
const Receiver = require("../../models/Receiver");


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




module.exports= {

    postReiver
}
