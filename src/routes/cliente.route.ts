
// Ruta del Path: /api/v1/cliente

import { validateFields } from '../middlewares/validate-fields';
import { crearClientes, deleteCliente, getClientes, getUnCliente, updateCliente, updateEstadoCliente } from './../controllers/cliente.controller';

// Archivo que contiene rutas
import { Router } from "express";


const router = Router();

// El path por defecto de la ruta es cliente
router.post("/", 
[
  check("nombre", "El nombre es obligatorio").not().isEmpty(),
  check("direccion", "La dorección es obligatoria").not().isEmpty(), 
  check("email", "El email es obligatotio").not().isEmpty().isEmail(),
  check("telefono", "El telefono es obligatorio").not().isEmpty(),
  check("tipoDocumento", "El tipo documento es obligatorio").not().isEmpty(),
  check("numeroDocumento", "El número documento es obligatorio").not().isEmpty(),
  validateFields
], 
crearClientes);
router.get("/", getClientes);
router.get("/:id", getUnCliente);
router.put("/:id", updateCliente);
router.put("/estado/:id", updateEstadoCliente);
router.delete("/:id", deleteCliente);

export default router;

function check(arg0: string, arg1: string) {
  throw new Error("Function not implemented.");
}
