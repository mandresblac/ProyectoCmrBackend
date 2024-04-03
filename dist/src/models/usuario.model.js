"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Esquema o tipos de datos
const UsuarioSchema = new mongoose_1.Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    direccion: { type: String },
    telefono: { type: String },
    tipoDocumento: { type: String, required: true },
    numeroDocumento: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    oportunidades: { type: String },
    rol: { type: String, required: true, default: "ADMIN" }, // Administrador, visitante, lector, auditor
    estado: { type: Boolean, required: true, default: true },
    createdAt: { type: Date, default: Date.now() }
});
const UsuarioModel = (0, mongoose_1.model)("usuario", UsuarioSchema);
exports.default = UsuarioModel;
//# sourceMappingURL=usuario.model.js.map