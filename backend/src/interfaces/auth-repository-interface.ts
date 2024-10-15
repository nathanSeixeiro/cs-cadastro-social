

interface IAuthRepository {
  createToken(email: string): Promise<string>;
  logout(): Promise<void>;
}

export default IAuthRepository;