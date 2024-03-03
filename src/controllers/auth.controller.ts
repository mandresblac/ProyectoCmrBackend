import bcrypt  from 'bcryptjs';
import { Request, Response } from "express";
import UsuarioModel from "../models/usuario.model";

export const login = async (req: Request, res: Response) => {
  const { login: loginUser, password } = req.body;
  
  try {
    // Verificamos si login coinside
    const usuario = await UsuarioModel.findOne({ login: loginUser
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

function generateJWT(_id: any, login: any) {
  throw new Error('Function not implemented.');
}
