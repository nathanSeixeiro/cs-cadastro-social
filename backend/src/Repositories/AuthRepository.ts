import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
import IAuthRepository from "../interfaces/auth-repository-interface";

configDotenv();

export default class AuthRepository implements IAuthRepository {
  private _secret = process.env.JWT_SECRET;

  createToken(email: string): string {
    if (!this._secret) {
      throw new Error("JWT_SECRET não está configurado.");
    }
    const token = jwt.sign({ email }, this._secret, { expiresIn: "1d" });
    return token;
  }

  createPasswordResetToken(userId: number): string {
    if (!this._secret) {
      throw new Error("JWT secret is not defined.");
    }
    const token = jwt.sign({ id: userId }, this._secret, { expiresIn: "1h" });
    return token;
  }

  verifyToken(token: string): unknown {
    try {
      if (!this._secret) {
        throw new Error("JWT secret is not defined.");
      }
      const decoded = jwt.verify(token, this._secret);
      return decoded; // Retorna os dados decodificados (ex.: { id: userId, iat: timestamp, exp: timestamp })
    } catch (error) {
      throw new Error("Invalid or expired token.");
    }
  }

  logout(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
