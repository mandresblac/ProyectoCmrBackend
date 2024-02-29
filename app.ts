import dotenv from "dotenv";
import Server from "./src/server";

// Configurar .env - variables de entorno
dotenv.config();

const server = new Server();
server.listen();