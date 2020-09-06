const { response } = require("express");

const Message = require("../models/message");

const getChat = async(req, res = response) => {
    const myId = req.uid;
    const messagesFrom = req.params.from;
    const messages = await Message.find({
        $or: [{ from: myId, to: messagesFrom }, { from: messagesFrom, to: myId }]
    })
    .sort({createdAt: "desc"})
    .limit(30);

    res.json({
        ok: true,
        messages
    });
}

module.exports = {
    getChat
}