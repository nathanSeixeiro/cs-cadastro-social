interface IAuthRepository {
  createToken(email: string): Promise<string>;
  logout(token: string): Promise<void>;
}

export default IAuthRepository;
