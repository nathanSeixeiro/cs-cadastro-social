import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";

import IAuthRepository from "../interfaces/auth-repository-interface";

configDotenv();

export default class AuthRepository implements IAuthRepository {
  private _secret = process.env.JWT_SECRET;

  async createToken(email: string): Promise<string> {
    if (!this._secret) {
      throw new Error("JWT_SECRET não está configurado.");
    }
    const token = jwt.sign({ email }, this._secret, { expiresIn: "1d" });
    return token;
  }

  async logout(token: string): Promise<void> {
    if (!this._secret) {
      throw new Error("JWT_SECRET não está configurado.");
    }
    try {
      const decoded = jwt.verify(token, this._secret);
      console.log("Logout bem-sucedido para o token:", decoded);
    } catch (err: any) {
      console.error("Erro ao fazer logout:", err.message);
      throw new Error("Token inválido ou já expirado.");
    }
  }
}
