import express, { Application, Request, Response } from "express";
import { dbConnection } from "./database/connection";
import clientesRoutes from "./routes/cliente.route";
import usuarioRoutes from "./routes/usuario.route";
import authRoutes from "./routes/auth.route";
import productoRoutes from "./routes/producto.route"
import cors from "cors";

class Server {
  private app: Application; // Variable para la aplicacion
  private port: string; // Variable para el puerto
  private apiPaths = { 
    cliente: "/api/v1/cliente",
    usuario: "/api/v1/usuario",
    auth: "/api/v1/auth",
    producto: "/api/v1/producto"
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "3000";

    // Base de datos
    dbConnection();
    
    // Metodos iniciales
    this.middlewares();

    // Rutas
    this.routes();
  }

  miPrimeraApi() {
    this.app.get("/", (req: Request, res: Response) => {
      res.status(200).json({msg:"Information"});
    })
  }

  middlewares() {
    // Para evitar error de cors
    this.app.use(cors());

    // Lectura del body en JSON
    this.app.use(express.json());

    // Llamamos la Api
    this.miPrimeraApi();
  }

  routes(): void {
    this.app.use(this.apiPaths.cliente, clientesRoutes);
    this.app.use(this.apiPaths.usuario, usuarioRoutes);
    this.app.use(this.apiPaths.auth, authRoutes);
    this.app.use(this.apiPaths.producto, productoRoutes);
  }

  listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto ${this.port}`);
    })
  }
}

// Exportamos la clase Server por default
export default Server;