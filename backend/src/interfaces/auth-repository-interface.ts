interface IAuthRepository {
  createToken(email: string): Promise<string>;
  createPasswordResetToken(userId: number): Promise<string>; // Gera um token para redefinição de senha
  verifyToken(token: string): Promise<any>; // Verifica e decodifica um token
  logout(): Promise<void>;
}

export default IAuthRepository;
