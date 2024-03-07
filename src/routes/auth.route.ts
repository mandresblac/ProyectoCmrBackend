import { Router } from "express";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields";
import { cambioContrasena, login, olvidoContrasena } from "../controllers/auth.controller";
import validateJWT, { validateJWTPass } from "../middlewares/validate-jwt";

// Path /api/v1/auth
const router = Router();

router.post(
  "/", 
  [
    check("login", "El número login es obligatorio").not().isEmpty(),
    check("password", "El password es obligatorio").not().isEmpty(),
    validateFields
  ], 
  login
);

router.post(
  "/olvidecontrasena", 
  [
    check("login", "El número login es obligatorio").not().isEmpty(),
    check("numeroDocumento", "El numero del documento es obligatorio").not().isEmpty(),
    validateFields
  ], 
  olvidoContrasena
);

router.put(
  "/cambiocontrasena",  // Valida token
  validateJWTPass,
  [
    check("password", "El password es obligatorio").not().isEmpty(),
    validateFields
  ], 
  cambioContrasena
);

// Exportamos por default la constante router
export default router;