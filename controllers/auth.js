const { response } = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/user");
const { genJWT } = require("../helpers/jwt");

const createUser = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        const emailExists = await User.findOne({email});

        if(emailExists) {
            return res.status(400).json({
                ok: false,
                msg: "El correo electrónico ya está registrado"
            })
        }

        const user = new User(req.body)

        // Encriptar la contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        // Generar JWT
        const token = await genJWT(user.id);

        res.json({
            ok: true,
            user,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Contacte al administrador"
        })
    }
}

const login = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({
                ok: false,
                msg: "Correo electrónico no existe"
            });
        }

        const validPassword = bcrypt.compareSync(password, user.password)
        if(!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: "Contraseña incorrecta"
            });
        }

        // Generara JWT
        const token = await genJWT(user.id);
        res.json({
            ok: true,
            user,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Contacte al administrador"
        })
    }
};

const renewToken = async (req, res = response) => {
    const uid = req.uid;
    const token = await genJWT(uid);
    const user = await User.findById(uid);

    res.json({
        ok: true,
        user,
        token
    });
};

module.exports = {
    createUser,
    login,
    renewToken
};