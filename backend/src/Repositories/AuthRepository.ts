import jwt from 'jsonwebtoken';
import { configDotenv } from 'dotenv';

import IAuthRepository from "../interfaces/auth-repository-interface";

configDotenv();

export default class AuthRepository implements IAuthRepository {
  private _secret = process.env.JWT_SECRET;

  async createToken(email: string, senha: string): Promise<string> {
    const token = jwt.sign({ email }, this._secret!, { expiresIn: '1d' });
    return token;
  }
  register(email: string, senha: string): Promise<object | null> {
    throw new Error("Method not implemented.");
  }
  logout(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
