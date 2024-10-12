

interface IAuthRepository {
  createToken(email: string, senha: string): Promise<string>;
  register(email: string, senha: string): Promise<object | null>;
  logout(): Promise<void>;
}

export default IAuthRepository;