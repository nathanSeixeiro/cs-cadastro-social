import IAuthRepository from "../interfaces/auth-repository-interface";

export default class AuthRepository implements IAuthRepository {
  login(email: string, senha: string): Promise<object | null> {
    throw new Error("Method not implemented.");
  }
  register(email: string, senha: string): Promise<object | null> {
    throw new Error("Method not implemented.");
  }
  logout(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
