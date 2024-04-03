"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
// Ruta del Path: /api/v1/cliente
const cliente_controller_1 = require("./../controllers/cliente.controller");
// Archivo que contiene rutas
const express_1 = require("express");
const validate_fields_1 = require("../middlewares/validate-fields");
const validate_jwt_1 = __importDefault(require("../middlewares/validate-jwt"));
const router = (0, express_1.Router)();
// El path por defecto de la ruta es cliente
router.post("/", 
// validateJWT,
[
    (0, express_validator_1.check)("nombre", "El nombre es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("telefono", "El telefono es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("email", "El email es obligatotio").not().isEmpty().isEmail(),
    (0, express_validator_1.check)("tipoDocumento", "El tipo documento es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("numeroDocumento", "El número documento es obligatorio").not().isEmpty(),
    validate_fields_1.validateFields
], cliente_controller_1.crearClientes);
router.get("/", cliente_controller_1.getClientes);
router.get("/:id", validate_jwt_1.default, cliente_controller_1.getUnCliente);
router.put("/:id", validate_jwt_1.default, cliente_controller_1.updateCliente);
router.put("/estado/:id", validate_jwt_1.default, cliente_controller_1.updateEstadoCliente);
router.delete("/:id", validate_jwt_1.default, cliente_controller_1.deleteCliente);
exports.default = router;
//# sourceMappingURL=cliente.route.js.map