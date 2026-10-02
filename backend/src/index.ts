import "dotenv/config";
import "reflect-metadata";

import express from "express";
import cors from "cors";
import { AppDataSource } from "./database/data-source.js";
import userRoutes from "./modules/user/user.routes.js";
import { errorHandlerMiddleware } from "./middlewares/errorHandler.middleware.js";

const usuarios = [
    { id: 1, nombre: 'Carlos', email: 'carlos@example.com', password: 'password123' },
];

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.post("/api/users/register", (req, res) => {

  const nombre = req.body.nombre;
  const email = req.body.email;
  const password = req.body.password;
  
  const nuevoUsuario = {
        id: usuarios.length + 1, 
        nombre: req.body.nombre, 
        email: req.body.email,
        password: req.body.password
    };
  usuarios.push(nuevoUsuario); 
  res.status(201).json(nuevoUsuario);
});

app.use(errorHandlerMiddleware);

AppDataSource.initialize()
  .then(() => {
    console.log("Base de datos conectada");
    app.listen(process.env.PORT || 8080, () => {
      console.log(`Servidor en puerto ${process.env.PORT || 8080}`);
    });
  })
  .catch((err: Error) => {
    console.error("Error al conectar:", err);
    process.exit(1);
  });
