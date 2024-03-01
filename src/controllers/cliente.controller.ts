// En este archivo se hace la estructura del CRUD: Create, Read, Update, Delete

import { Request, Response } from "express";
import ClienteModel from "../models/cliente.model";
import clienteModel from "../models/cliente.model";


// CREATE = Crear, enviar información al servidor, metodo post
export const crearClientes = async (req: Request, resp: Response) => {
  const { body } = req;

  try {
    console.log(req);
    console.log(body);

    const clienteNuevo = new ClienteModel(body);
    const clienteCreado = await clienteNuevo.save();

    resp.status(200).json({
      ok: true,
      msg: "Cliente registrado",
      cliente: clienteCreado
    });
  } catch (error) {
    console.log(error); // Error para el programador

    // Error para el frontend
    resp.status(400).json({
      ok: false,
      msg: "Error al crear el cliente"
    })
  };
};

// READ = Leer , Solicitar informacion al servidor, metodo get
export const getClientes = async(req: Request, resp: Response) => {
  try {
    // Busca todos los clientes
    const clientes = await clienteModel.find();
    resp.status(200).json({
      ok: true,
      clientes,
    })
  } catch (error) {
    resp.status(400).json({
      ok: false,
      cmsg: "Error al consultar los clientes"
    })
  }
};

// READ = Solicita un solo cliente
export const getUnCliente = async(req: Request, resp: Response) => {
  try {
    const id = req.params.id;
    console.log("Esto es el id", id);

    // El busca un cliente por id
    const clientes = await clienteModel.findById({ _id: id});
    resp.status(200).json({
      ok: true,
      clientes,

    })
  } catch (error) {
    resp.status(400).json({
      ok: false,
      cmsg: "Error consultar los clientes"
    })
  };
};

// UPDATE = actualizar un cliente, actualiza información en el servidor, metodo put
export const updateCliente = async(req: Request, resp: Response) => {
  try {
    const id = req.params.id; // id del cliente
    const body = req.body; // Opción 1
    // const { body } = req; // Opción 2, desestructuramos el body.

    // El busca todos los clientes
    const clienteActualizado = await clienteModel.findByIdAndUpdate( id, body, { new: true}); // findByIdAndUpdate recibe 3parametros

    resp.status(200).json({
      ok: true,
      cliente: clienteActualizado,

    })
  } catch (error) {
    resp.status(400).json({
      ok: false,
      cmsg: "Error consultar los clientes"
    })
  };
};

// UPDATE = Actualizar estado de un solo cliente
export const updateEstadoCliente = async(req: Request, resp: Response) => {
  try {
    // id del cliente
    const id = req.params.id;
    const body = req.body; // Opción 1
    // const { body } = req; // Opción 2, desestructuramos el body.

    // El busca todos los clientes
    const clienteActualizado = await clienteModel.findByIdAndUpdate( id, { estado: false },{ new: true});

    resp.status(200).json({
      ok: true,
      cliente: clienteActualizado,

    })
  } catch (error) {
    resp.status(400).json({
      ok: false,
      cmsg: "Error consultar los clientes"
    })
  };
};

// DELETE = eliminar. elimina información en el servidor, metodo delete
export const deleteCliente = async(req: Request, resp: Response) => {
  try {
    // id del cliente
    const id = req.params.id;

    // El busca todos los clientes
    const clienteEliminado = await clienteModel.findByIdAndDelete(id);

    resp.status(200).json({
      ok: true,
      cliente: clienteEliminado,
    })
  } catch (error) {
    resp.status(400).json({
      ok: false,
      cmsg: "Error consultar los clientes"
    })
  };
};