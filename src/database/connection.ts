import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    const dbUrl = process.env.DB_CONECTION;
    if (!dbUrl) {
      throw new Error("Error en la conexión a la base de datos");
    }

    await mongoose.connect(dbUrl);
    console.log("Tengo conexion a la base de datos")
  } catch (error) {
    console.log(error);
    console.log("Error en la conexión a la base de datos");
  }
};