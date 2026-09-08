import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as userRepository from "./user.repository.js";


export const register = async (email: string, password: string) => {
  //Buscar usuario por email
  const existing = await userRepository.findByEmail(email);
  if (existing) throw new Error("El usuario ya existe");


  const passwordHash = await bcrypt.hash(password, 10);


  return userRepository.createUser({ email, passwordHash });
};


export const login = async (email: string, password: string) => {
  //Buscar usuario por email
  const user = await userRepository.findByEmail(email);
 
  if (!user) {
    throw new Error("Credenciales iválidas");
  }


  //Se comparan la constraseña ingresada, con la registrada en la db
  const passwordCompare = await bcrypt.compare(password, user.passwordHash);


  if (!passwordCompare) {
    throw new Error("Credenciales iválidas");
  }


  // Generar JWT
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );


  //Retornar los datos del usuario
  return {
    token,
    user: {
      id: user.id,
      email: user.email,
    },
  };
 
};
