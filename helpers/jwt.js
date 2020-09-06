const jwt = require("jsonwebtoken");

const genJWT = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = {
            uid
        };
    
        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '12h',
        }, (err, token) => {
            if(err) {
                // no se pudo crear el token
                reject("No se pudo generar el JWT")
            } else {
                // TOKEN
                resolve(token);
            }
        });
    });
};

const checkJWT = (token = "") => {
    try {
        const  { uid } = jwt.verify(token, process.env.JWT_SECRET);

        return [true, uid];
    } catch (error) {
        return [false, null];
    }
}

module.exports = {
    genJWT,
    checkJWT
};