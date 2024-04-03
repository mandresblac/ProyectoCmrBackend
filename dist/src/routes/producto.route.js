"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
// Archivo que contiene rutas
const express_1 = require("express");
const validate_fields_1 = require("../middlewares/validate-fields");
const validate_jwt_1 = __importDefault(require("../middlewares/validate-jwt"));
const producto_controller_1 = require("../controllers/producto.controller");
const router = (0, express_1.Router)();
// El path por defecto de la ruta es cliente
router.post("/", validate_jwt_1.default, [
    (0, express_validator_1.check)("nombre", "El nombre es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("precio", "El precio es obligatotio").not().isEmpty(),
    (0, express_validator_1.check)("categoria", "La categoria es obligatorio").not().isEmpty(),
    validate_fields_1.validateFields
], producto_controller_1.crearProducto);
router.get("/", validate_jwt_1.default, producto_controller_1.getProductos);
// Exportamos por default la constante router
exports.default = router;
//# sourceMappingURL=producto.route.js.map