"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateJWTPass = void 0;
const jwt = require("jsonwebtoken");
;
const validateJWT = (req, res, next) => {
    const token = req.header("x-token");
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: "No hay token en la petición"
        });
    }
    try {
        const { _id } = jwt.verify(token, process.env.JWT_SECRET);
        req._id = _id;
        next();
    }
    catch (error) {
        return res.status(401).json({
            ok: false,
            msg: "Token invalido"
        });
    }
};
const validateJWTPass = (req, res, next) => {
    const token = req.header("x-token-pass");
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: "No hay token en la petición"
        });
    }
    try {
        const { _id } = jwt.verify(token, process.env.JWT_SECRET_PASS);
        req._id = _id;
        next();
    }
    catch (error) {
        return res.status(401).json({
            ok: false,
            msg: "Token invalido"
        });
    }
};
exports.validateJWTPass = validateJWTPass;
exports.default = validateJWT;
//# sourceMappingURL=validate-jwt.js.map