import { Router } from "express";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields";
import { crearUsuario, deleteUsuario, getUnUsuario, getUsuarios, updateUsuario } from "../controllers/usuario.controller";
import validateJWT from "../middlewares/validate-jwt";

// path: /api/v1/usuario
const router = Router();

router.post("/",
// validateJWT, 
[
  check("nombre", "El nombre es obligatorio").not().isEmpty(), 
  check("email", "El email es obligatotio").not().isEmpty().isEmail(),
  check("tipoDocumento", "El tipo documento es obligatorio").not().isEmpty(),
  check("numeroDocumento", "El número documento es obligatorio").not().isEmpty(),
  check("password", "El password es obligatorio").not().isEmpty(),
  validateFields
], 
crearUsuario);

router.get("/", getUsuarios);
router.put("/:id", validateJWT, updateUsuario);
router.delete("/:id", validateJWT, deleteUsuario);
router.get("/:id", getUnUsuario);

// Exportamos por default la constante router
export default router;