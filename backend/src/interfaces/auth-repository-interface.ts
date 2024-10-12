

interface IAuthRepository {
  login(email: string, senha: string): Promise<object | null>;
  register(email: string, senha: string): Promise<object | null>;
  logout(): Promise<void>;
}

export default IAuthRepository;