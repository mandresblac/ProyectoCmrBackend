"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cambioContrasena = exports.olvidoContrasena = exports.renewToken = exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const usuario_model_1 = __importDefault(require("../models/usuario.model"));
const jwt_1 = __importDefault(require("../helpers/jwt"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // Verificamos si login coinside
        const usuario = yield usuario_model_1.default.findOne({ email: email
        });
        // Si no existe
        if (!usuario) {
            return res.status(401).json({
                ok: false,
                msg: "Las credenciales no son validas"
            });
        }
        // Verificamos que el password que esta enviando sea correcto
        const validarPassword = bcryptjs_1.default.compareSync(password, usuario.password);
        if (!validarPassword) {
            return res.status(400).json({
                ok: false,
                msg: "Las credenciales no son validas"
            });
        }
        // Generar token
        const token = yield (0, jwt_1.default)(usuario._id, usuario.login);
        res.status(200).json({
            ok: true,
            usuario: usuario,
            token
        });
    }
    catch (error) {
        res.status(400).json({
            ok: false,
            error,
            msg: "Hable con el administrador"
        });
    }
});
exports.login = login;
// Para renovar el token
const renewToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req._id;
    try {
        // Vlidasmos si el id viene vacio o indefinido "undefined"
        if (typeof id === "undefined") {
            throw new Error("No existe un id");
        }
        const usuario = yield usuario_model_1.default.findById(id);
        // Generar token
        const token = yield (0, jwt_1.default)(id.toString());
        res.json({
            ok: true,
            usuario,
            token
        });
    }
    catch (error) {
        console.error(error);
        res.status(401).json({
            ok: false,
            error,
            msg: "Hable con el administrador"
        });
    }
});
exports.renewToken = renewToken;
/* Funciones nuevas */
const olvidoContrasena = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { login, numeroDocumento } = req.body;
    try {
        const existeUsuario = yield usuario_model_1.default.findOne({
            login: login,
            numeroDocumento: numeroDocumento
        });
        // Si no existe el usuario
        if (!existeUsuario) {
            res.status(400).json({
                ok: false,
                msg: "No coinciden sus credenciales"
            });
        }
        // Si coincide
        const id = existeUsuario === null || existeUsuario === void 0 ? void 0 : existeUsuario._id;
        // Generamos Token
        if (id) {
            const token = yield (0, jwt_1.default)(id, login, "1H", process.env.JWT_SECRET_PASS);
            res.status(200).json({
                ok: true,
                msg: "Proceso exitoso",
                usuario: existeUsuario,
                token
            });
        }
        ;
    }
    catch (error) {
        console.error(error);
        res.status(401).json({
            ok: false,
            msg: "No se logro validar su acceso con exito, por favor comuniquese con el administrador"
        });
    }
});
exports.olvidoContrasena = olvidoContrasena;
const cambioContrasena = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req._id;
    const { password } = req.body;
    try {
        // validación
        if (!password) {
            res.status(400).json({
                ok: false,
                msg: "Por favor digite una contraseña valida"
            });
        }
        // Encripta contraseña
        const newPassword = bcryptjs_1.default.hashSync(password, 10);
        // Actualiza contraseña
        const actualizarPassword = yield usuario_model_1.default.findByIdAndUpdate({
            _id: id,
            password: newPassword
        });
        if (!actualizarPassword) {
            res.status(400).json({
                ok: false,
                msg: "Error al actualizar contraseña"
            });
        }
        res.status(200).json({
            ok: true,
            msg: "Contraseña actualizada",
            usuario: actualizarPassword
        });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            ok: false,
            msg: "Error al actualizar la contraseña"
        });
    }
});
exports.cambioContrasena = cambioContrasena;
//# sourceMappingURL=auth.controller.js.map