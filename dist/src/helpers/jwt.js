"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
// Funcion que genera el token
const generateJWT = (_id, login = "", expiresIn = process.env.EXPIRES_IN, jwtSecret = process.env.JWT_SECRET) => {
    return new Promise((resolve, reject) => {
        const payload = {
            _id,
            login // cambiarlo por email 
        };
        jwt.sign(payload, jwtSecret, {
            expiresIn: expiresIn
        }, (error, token) => {
            if (error) {
                console.log(error);
                reject("No se puede generar el token");
            }
            else
                resolve(token);
        });
    });
};
exports.default = generateJWT;
//# sourceMappingURL=jwt.js.map