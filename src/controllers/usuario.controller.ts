import { Request, Response } from "express";
import UsuarioModel from "../models/usuario.model";
import bcrypt from "bcryptjs";
import usuarioModel from "../models/usuario.model";

export const crearUsuario = async (req: Request, resp: Response) => {
  const { body } = req; //Opcion 1
  const { email, password } = body; //Opcion 2

  try {
    // Para saber si ya existe un login
    const existeEmail = await UsuarioModel.findOne({
      email: email
    });

    // Si ya existe un login retorna un error 409
    if (existeEmail) {
      return resp.status(409).json({
        ok:false,
        msg: `Ya existe el login ${email} creado`
      })
    }

    const newUsuario = new UsuarioModel({
      ...body,
    })

    // Libreria bcrypt, salto es las veces que bcrypt genera encriptaciones, 10 saltos
    const salto = bcrypt.genSaltSync(10);
    newUsuario.password = bcrypt.hashSync(password, salto);

    console.log(`Contraseña ${newUsuario.password}`)

    const usuarioCreado = await newUsuario.save();

    resp.status(200).json({
      ok:true,
      msg: "Usuario creado satisfactoriamente",
      usuarioCreado
    })
  } catch (error) {
    console.error(error);
    resp.status(400).json({
      ok: false,
      error,
      msg: "Error al crear el usuario, comuniquese con el administrador"
    })
  }
}

export const getUsuarios = async(req: Request, resp: Response) => {
  try {
    // Busca todos los clientes
    const usuarios = await usuarioModel.find();
    resp.status(200).json({
      ok: true,
      usuarios,
    })
  } catch (error) {
    resp.status(400).json({
      ok: false,
      cmsg: "Error al consultar los usuarios"
    })
  }
};

export const updateUsuario = async(req: Request, resp: Response) => {
  try {
    const id = req.params.id; // id delusuario
    const body = req.body; // Opción 1
    // const { body } = req; // Opción 2, desestructuramos el body.

    // El busca todos los usuarios
    const usuarioActualizado = await usuarioModel.findByIdAndUpdate( id, body, { new: true}); // findByIdAndUpdate recibe 3parametros

    resp.status(200).json({
      ok: true,
      cliente: usuarioActualizado,

    })
  } catch (error) {
    resp.status(400).json({
      ok: false,
      cmsg: "Error consultar los clientes"
    })
  };
};

export const deleteUsuario = async(req: Request, resp: Response) => {
  try {
    // id del cliente
    const id = req.params.id;

    // El busca todos los clientes
    const usaurioEliminado = await usuarioModel.findByIdAndDelete(id);

    resp.status(200).json({
      ok: true,
      cliente: usaurioEliminado,
    })
  } catch (error) {
    resp.status(400).json({
      ok: false,
      cmsg: "Error consultar los clientes"
    })
  };
};