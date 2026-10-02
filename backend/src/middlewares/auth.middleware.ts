import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.header("authorization");
  const token = authorization?.startsWith("Bearer ") ? authorization.slice(7) : null;

  if (!token) {
    res.status(401).json({ message: "Se requiere autenticación" });
    return;
  }

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret || jwtSecret.length < 32) {
    res.status(500).json({ message: "La configuración de autenticación no es válida" });
    return;
  }

  try {
    jwt.verify(token, jwtSecret);
    next();
  } catch {
    res.status(401).json({ message: "El token es inválido o ha expirado" });
  }
};