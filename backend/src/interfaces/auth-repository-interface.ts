interface IAuthRepository {
  createToken(email: string): string;
  createPasswordResetToken(userId: number): string;
  verifyToken(token: string): unknown; // Verifica e decodifica um token
  logout(): Promise<void>;
}

export default IAuthRepository;
