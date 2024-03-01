import { Request, Response } from "express";
import UsuarioModel from "../models/usuario.model";
import bcrypt from "bcryptjs";

export const crearUsuario = async (req: Request, resp: Response) => {
  const { body } = req; //Opcion 1
  const { login, password } = body; //Opcion 2

  try {
    // Para saber si ya existe un login
    const existeLogin = await UsuarioModel.findOne({
      login: login
    });

    // Si ya existe un login retorna un error 409
    if (existeLogin) {
      return resp.status(409).json({
        ok:false,
        msg: `Ya existe el login ${login} creado`
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