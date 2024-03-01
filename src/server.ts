import express, { Application, Request, Response } from "express";
import { dbConnection } from "./database/connection";
import usuarioRoutes from "./routes/usuario.route";
import clientesRoutes from "./routes/cliente.route";

class Server {
  private app: Application;
  private port: string;
  private apiPaths = {
    cliente: "/api/v1/cliente",
    usuario: "/api/v1/usuario"
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "4000";

    // Llamado de la Base de datos
    dbConnection();

    // Llamado de Metodos iniciales
    this.middlewares();

    // Llamado de rutas
    this.routes();
  };

  miPrimeraApi() {
    this.app.get("/", (req: Request, res: Response) => {
      res.status(200).json({msg: "Information nueva"})
    });
  };

  middlewares() {
    // Lectura del body en JSON
    this.app.use(express.json());

    // Llamamos la Api
    this.miPrimeraApi();
  };

  routes(): void {
    this.app.use(this.apiPaths.cliente, clientesRoutes);
    this.app.use(this.apiPaths.usuario, usuarioRoutes);
  };

  listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto ${this.port}`);
    });
  }
}

export default Server;