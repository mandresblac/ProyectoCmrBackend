"use strict";
// En este archivo se hace la estructura del CRUD: Create, Read, Update, Delete
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
exports.deleteCliente = exports.updateEstadoCliente = exports.updateCliente = exports.getUnCliente = exports.getClientes = exports.crearClientes = void 0;
const cliente_model_1 = __importDefault(require("../models/cliente.model"));
const cliente_model_2 = __importDefault(require("../models/cliente.model"));
// CREATE = Crear, enviar información al servidor, metodo post
const crearClientes = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        console.log(req);
        console.log(body);
        const clienteNuevo = new cliente_model_1.default(body);
        const clienteCreado = yield clienteNuevo.save();
        resp.status(200).json({
            ok: true,
            msg: "Cliente registrado",
            cliente: clienteCreado
        });
    }
    catch (error) {
        console.log(error); // Error para el programador
        // Error para el frontend
        resp.status(400).json({
            ok: false,
            msg: "Error al crear el cliente"
        });
    }
    ;
});
exports.crearClientes = crearClientes;
// READ = Leer , Solicitar informacion al servidor, metodo get
const getClientes = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Busca todos los clientes
        const clientes = yield cliente_model_2.default.find();
        resp.status(200).json({
            ok: true,
            clientes,
        });
    }
    catch (error) {
        resp.status(400).json({
            ok: false,
            cmsg: "Error al consultar los clientes"
        });
    }
});
exports.getClientes = getClientes;
// READ = Solicita un solo cliente
const getUnCliente = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        console.log("Esto es el id", id);
        // El busca un cliente por id
        const clientes = yield cliente_model_2.default.findById({ _id: id });
        resp.status(200).json({
            ok: true,
            clientes,
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
exports.getUnCliente = getUnCliente;
// UPDATE = actualizar un cliente, actualiza información en el servidor, metodo put
const updateCliente = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id; // id del cliente
        const body = req.body; // Opción 1
        // const { body } = req; // Opción 2, desestructuramos el body.
        // El busca todos los clientes
        const clienteActualizado = yield cliente_model_2.default.findByIdAndUpdate(id, body, { new: true }); // findByIdAndUpdate recibe 3parametros
        resp.status(200).json({
            ok: true,
            cliente: clienteActualizado,
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
exports.updateCliente = updateCliente;
// UPDATE = Actualizar estado de un solo cliente
const updateEstadoCliente = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // id del cliente
        const id = req.params.id;
        const body = req.body; // Opción 1
        // const { body } = req; // Opción 2, desestructuramos el body.
        // El busca todos los clientes
        const clienteActualizado = yield cliente_model_2.default.findByIdAndUpdate(id, { estado: false }, { new: true });
        resp.status(200).json({
            ok: true,
            cliente: clienteActualizado,
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
exports.updateEstadoCliente = updateEstadoCliente;
// DELETE = eliminar. elimina información en el servidor, metodo delete
const deleteCliente = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // id del cliente
        const id = req.params.id;
        // El busca todos los clientes
        const clienteEliminado = yield cliente_model_2.default.findByIdAndDelete(id);
        resp.status(200).json({
            ok: true,
            cliente: clienteEliminado,
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
exports.deleteCliente = deleteCliente;
//# sourceMappingURL=cliente.controller.js.map