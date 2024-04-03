"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validate_fields_1 = require("../middlewares/validate-fields");
const usuario_controller_1 = require("../controllers/usuario.controller");
const validate_jwt_1 = __importDefault(require("../middlewares/validate-jwt"));
// path: /api/v1/usuario
const router = (0, express_1.Router)();
router.post("/", 
// validateJWT, 
[
    (0, express_validator_1.check)("nombre", "El nombre es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("email", "El email es obligatotio").not().isEmpty().isEmail(),
    (0, express_validator_1.check)("tipoDocumento", "El tipo documento es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("numeroDocumento", "El número documento es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("password", "El password es obligatorio").not().isEmpty(),
    validate_fields_1.validateFields
], usuario_controller_1.crearUsuario);
router.get("/", usuario_controller_1.getUsuarios);
router.put("/:id", validate_jwt_1.default, usuario_controller_1.updateUsuario);
router.delete("/:id", validate_jwt_1.default, usuario_controller_1.deleteUsuario);
router.get("/:id", usuario_controller_1.getUnUsuario);
// Exportamos por default la constante router
exports.default = router;
//# sourceMappingURL=usuario.route.js.map