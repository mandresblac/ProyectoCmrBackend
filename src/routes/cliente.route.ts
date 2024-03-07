import { check } from 'express-validator';

// Ruta del Path: /api/v1/cliente

import { crearClientes, deleteCliente, getClientes, getUnCliente, updateCliente, updateEstadoCliente } from './../controllers/cliente.controller';

// Archivo que contiene rutas
import { Router } from "express";
import { validateFields } from '../middlewares/validate-fields';
import validateJWT from '../middlewares/validate-jwt';


const router = Router();

// El path por defecto de la ruta es cliente
router.post("/", 
validateJWT,
[
  check("nombre", "El nombre es obligatorio").not().isEmpty(), 
  check("telefono", "El telefono es obligatorio").not().isEmpty(),
  check("email", "El email es obligatotio").not().isEmpty().isEmail(),
  check("tipoDocumento", "El tipo documento es obligatorio").not().isEmpty(),
  check("numeroDocumento", "El número documento es obligatorio").not().isEmpty(),
  validateFields
], 
crearClientes);
router.get("/", getClientes);
router.get("/:id", validateJWT, getUnCliente);
router.put("/:id", validateJWT, updateCliente);
router.put("/estado/:id", validateJWT, updateEstadoCliente);
router.delete("/:id", validateJWT, deleteCliente);

export default router;


