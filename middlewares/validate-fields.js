const { validationResult } = require('express-validator');

const validateFields = (req, res, next ) => {

    const errores = validationResult( req );

    if( !errores.isEmpty() ) {
        return res.status(400).json({
            ok: false,
            errors: errores.mapped()
        });
    }

    next();
}


module.exports = {
    validateFields
}