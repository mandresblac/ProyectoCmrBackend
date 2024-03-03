const jwt = require("jsonwebtoken")

// Funcion que genera el token
const generateJWT = (
  _id: string, 
  login: string, 
  expiresIn = process.env.EXPIRES_IN, 
  jwtSecret = process.env.JWT_SECRET
) => {
  return new Promise((resolve, reject) => {
    const payload = {
      _id,
      login
    };

    jwt.sign(
      payload,
      jwtSecret,
      {
        expiresIn: expiresIn
      },
      (error: string, token: string) => {
        if (error) {
          console.error(error);
          reject("No se puede generar el token");
        } else resolve(token);
      }
    );
  });
};

export default generateJWT;