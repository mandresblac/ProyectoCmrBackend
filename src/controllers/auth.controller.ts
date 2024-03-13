import bcrypt  from 'bcryptjs';
import { Request, Response } from "express";
import UsuarioModel from "../models/usuario.model";
import generateJWT from '../helpers/jwt';
import { CustomRequest } from '../middlewares/validate-jwt';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  
  try {
    // Verificamos si login coinside
    const usuario = await UsuarioModel.findOne({ email: email
    }); 

    // Si no existe
    if (!usuario) {
      return res.status(401).json({ 
        ok: false, 
        msg:"Las credenciales no son validas" 
      });
    }

    // Verificamos que el password que esta enviando sea correcto
    const validarPassword = bcrypt.compareSync(password, usuario.password);

    if (!validarPassword) {
      return res.status(400).json({
        ok: false, 
        msg:"Las credenciales no son validas" 
      });
    }

    // Generar token
    const token = await generateJWT(usuario._id, usuario.login);

    res.status(200).json({
      ok: true, 
      usuario: usuario,
      token 
    })
  } catch (error) {
    res.status(400).json({
        ok: false,
        error, 
        msg:"Hable con el administrador" 
      });
  }
};

// Para renovar el token
export const  renewToken = async (req: CustomRequest, res: Response) => {
  const id = req._id;

  try {
    // Vlidasmos si el id viene vacio o indefinido "undefined"
    if (typeof id === "undefined") {
    throw new Error("No existe un id")
    }
    const usuario =  await UsuarioModel.findById(id);

    // Generar token
    const token = await generateJWT(id.toString());

    res.json({
      ok: true,
      usuario
    })
  } catch (error) {
    console.error(error);
    res.status(401).json({
      ok: false,
      error,
      msg: "Hable con el administrador"
    })
  }
};

/* Funciones nuevas */

export const olvidoContrasena = async (req: Request, res: Response) => {
  const { login, numeroDocumento } = req.body;
  
  try {
    const existeUsuario = await UsuarioModel.findOne({
    login: login,
    numeroDocumento: numeroDocumento
  })

  // Si no existe el usuario
  if (!existeUsuario) {
    res.status(400).json({
      ok: false,
      msg: "No coinciden sus credenciales"
    })
  }

  // Si coincide
  const id = existeUsuario?._id

  // Generamos Token
  if (id) {
  const token = await generateJWT(
      id,
      login,
      "1H",
      process.env.JWT_SECRET_PASS
    );

    res.status(200).json({
      ok: true,
      msg: "Proceso exitoso",
      usuario: existeUsuario,
      token
    })
  };  
    
  } catch (error) {
    console.error(error);
    res.status(401).json({
      ok: false,
      msg: "No se logro validar su acceso con exito, por favor comuniquese con el administrador"
    })
  }
};

export const cambioContrasena = async (req: CustomRequest, res: Response) => {
  const id = req._id;
  const { password } = req.body

  try {

    // validación
    if (!password) {
      res.status(400).json({
        ok: false,
        msg: "Por favor digite una contraseña valida"
      })
    }

    // Encripta contraseña
    const newPassword = bcrypt.hashSync(password, 10);

    // Actualiza contraseña
    const actualizarPassword = await UsuarioModel.findByIdAndUpdate({
      _id: id, 
      password: newPassword
    });

    if (!actualizarPassword) {
      res.status(400).json({
        ok: false,
        msg: "Error al actualizar contraseña"
      })
    }

    res.status(200).json({
        ok: true,
        msg: "Contraseña actualizada",
        usuario: actualizarPassword
    })

  } catch (error) {
    console.error(error)
    res.status(400).json({
      ok: false,
      msg: "Error al actualizar la contraseña"
    })
  }
};