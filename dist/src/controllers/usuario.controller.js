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
exports.deleteUsuario = exports.updateUsuario = exports.getUnUsuario = exports.getUsuarios = exports.crearUsuario = void 0;
const usuario_model_1 = __importDefault(require("../models/usuario.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const usuario_model_2 = __importDefault(require("../models/usuario.model"));
const crearUsuario = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req; //Opcion 1
    const { email, password } = body; //Opcion 2
    try {
        // Para saber si ya existe un login
        const existeEmail = yield usuario_model_1.default.findOne({
            email: email
        });
        // Si ya existe un login retorna un error 409
        if (existeEmail) {
            return resp.status(409).json({
                ok: false,
                msg: `Ya existe el login ${email} creado`
            });
        }
        const newUsuario = new usuario_model_1.default(Object.assign({}, body));
        // Libreria bcrypt, salto es las veces que bcrypt genera encriptaciones, 10 saltos
        const salto = bcryptjs_1.default.genSaltSync(10);
        newUsuario.password = bcryptjs_1.default.hashSync(password, salto);
        console.log(`Contraseña ${newUsuario.password}`);
        const usuarioCreado = yield newUsuario.save();
        resp.status(200).json({
            ok: true,
            msg: "Usuario creado satisfactoriamente",
            usuarioCreado
        });
    }
    catch (error) {
        console.error(error);
        resp.status(400).json({
            ok: false,
            error,
            msg: "Error al crear el usuario, comuniquese con el administrador"
        });
    }
});
exports.crearUsuario = crearUsuario;
const getUsuarios = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Busca todos los clientes
        const usuarios = yield usuario_model_2.default.find();
        resp.status(200).json({
            ok: true,
            usuarios,
        });
    }
    catch (error) {
        resp.status(400).json({
            ok: false,
            cmsg: "Error al consultar los usuarios"
        });
    }
});
exports.getUsuarios = getUsuarios;
const getUnUsuario = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        console.log("Esto es el id", id);
        // El busca todos los clientes
        const usuarios = yield usuario_model_1.default.findById({ _id: id });
        resp.status(200).json({
            ok: true,
            usuarios,
        });
    }
    catch (error) {
        resp.status(400).json({
            ok: false,
            cmsg: "Error al obtener un usuario, comuniquese con el administrador."
        });
    }
    ;
});
exports.getUnUsuario = getUnUsuario;
const updateUsuario = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id; // id delusuario
        const body = req.body; // Opción 1
        // const { body } = req; // Opción 2, desestructuramos el body.
        // El busca todos los usuarios
        const usuarioActualizado = yield usuario_model_2.default.findByIdAndUpdate(id, body, { new: true }); // findByIdAndUpdate recibe 3parametros
        resp.status(200).json({
            ok: true,
            usuario: usuarioActualizado,
        });
    }
    catch (error) {
        resp.status(400).json({
            ok: false,
            cmsg: "Error consultar los clientes"
        });
    }
    ;
});
exports.updateUsuario = updateUsuario;
const deleteUsuario = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // id del cliente
        const id = req.params.id;
        // El busca todos los clientes
        const usaurioEliminado = yield usuario_model_2.default.findByIdAndDelete(id);
        resp.status(200).json({
            ok: true,
            usuario: usaurioEliminado,
        });
    }
    catch (error) {
        resp.status(400).json({
            ok: false,
            cmsg: "Error consultar los clientes"
        });
    }
    ;
});
exports.deleteUsuario = deleteUsuario;
//# sourceMappingURL=usuario.controller.js.map