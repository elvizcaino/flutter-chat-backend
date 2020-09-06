const { response } = require("express");

const User = require("../models/user");

const getUsers = async (req, res = response) => {

    const skip = Number(req.query.skip) || 0;

    
    const users = await User
        .find({ _id: { $ne: req.uid }}) //$ne = not existing
        .sort("-online")
        .skip(skip)
        .limit(20);
        
    res.json({
        ok: true,
        users
    });
};

module.exports = {
    getUsers
};