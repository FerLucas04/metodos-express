import { Request, Response } from "express";
import * as userService from "./user.service.js";

export const list = async (_req: Request, res: Response) => {
  const users = await userService.listUsers();
  res.json(users);
};

export const register = async (req: Request, res: Response) => {
  try {
    const { nombre, email, password } = req.body;
    const user = await userService.register(nombre, email, password);
    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};


export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await userService.login(email, password);
    res.status(200).json(result);
  } catch (error: unknown) {
    const invalidCredentials = error instanceof Error && error.message === "Credenciales inválidas";
    res.status(invalidCredentials ? 401 : 500).json({
      message: invalidCredentials ? error.message : "No se pudo iniciar sesión",
    });
  }
};
