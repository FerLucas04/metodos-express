import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as userRepository from "./user.repository.js";
import { User } from "./user.entity.js";

const toPublicUser = (user: User) => ({
  id: user.id,
  nombre: user.nombre,
  email: user.email,
  creadoEn: user.creadoEn,
});

export const register = async (nombre: string, email: string, password: string) => {
  //Buscar usuario por email
  const existing = await userRepository.findByEmail(email);
  if (existing) throw new Error("El usuario ya existe");


  const passwordHash = await bcrypt.hash(password, 10);
  const user = await userRepository.createUser({ nombre, email, passwordHash });
  return toPublicUser(user);
};

export const listUsers = async () => {
  const users = await userRepository.findAll();
  return users.map(toPublicUser);
};

export const login = async (email: string, password: string) => {
  //Buscar usuario por email
  const user = await userRepository.findByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    throw new Error("Credenciales inválidas");
  }

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret || jwtSecret.length < 32) {
    throw new Error("La configuración de autenticación no es válida");
  }

  const token = jwt.sign({ sub: String(user.id) }, jwtSecret, { expiresIn: "1h" });
  return { token, user: toPublicUser(user) };
};
