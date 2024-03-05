import { check } from 'express-validator';

// Archivo que contiene rutas
import { Router } from "express";
import { validateFields } from '../middlewares/validate-fields';
import validateJWT from '../middlewares/validate-jwt';
import { crearProducto, getProductos } from '../controllers/producto.controller';

const router = Router();

// El path por defecto de la ruta es cliente
router.post(
  "/", 
  validateJWT,
[
  check("nombre", "El nombre es obligatorio").not().isEmpty(), 
  check("precio", "El precio es obligatotio").not().isEmpty(),
  check("categoria", "La categoria es obligatorio").not().isEmpty(),
  validateFields
], 
crearProducto);

router.get("/", validateJWT, getProductos);

// Exportamos por default la constante router
export default router;