"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
;
// Esquema o tipos de datos
const ProductoSchema = new mongoose_1.Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String },
    precio: { type: Number, requred: true },
    categoria: { type: String, required: true },
    stock: { type: Number, required: true },
    createdAd: { type: Date, default: Date.now() },
    peso: { type: String, required: true },
    ip: { type: String },
    estado: { type: Boolean, required: true, default: true },
    caracteristicas: { type: Object, required: true },
    programasInstalados: { type: Object, required: true },
    distribuidor: { type: Object, required: true },
    opiniones: { type: Object },
    usuario: { type: mongoose_1.Schema.Types.ObjectId, ref: "usuario", required: true }
});
const ProductoModel = (0, mongoose_1.model)("producto", ProductoSchema);
exports.default = ProductoModel;
//# sourceMappingURL=producto.model.js.map