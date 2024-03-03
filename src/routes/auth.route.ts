import { Router } from "express";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields";
import { login } from "../controllers/auth.controller";

// Path /api/v1/auth
const router = Router();

router.post("/", 
[
  check("login", "El número login es obligatorio").not().isEmpty(),
  check("password", "El password es obligatorio").not().isEmpty(),
  validateFields
], 
login);

// Exportamos por default la constante router
export default router;