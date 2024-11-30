import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import Usuario from "./../Models/Usuario";
import { comparePassword, hashPassword } from "../utils/bycript"; // Adicione hashPassword para redefinir senha
import IUsuarioRepository from "../interfaces/usuario-repository-interface";
import IAuthRepository from "../interfaces/auth-repository-interface";

export default class AuthController {
  private authRepository: IAuthRepository;
  private usuarioRepository: IUsuarioRepository;

  constructor(
    authRepository: IAuthRepository,
    usuarioRepository: IUsuarioRepository
  ) {
    this.authRepository = authRepository;
    this.usuarioRepository = usuarioRepository;
  }

  async login(req: Request, res: Response) {
    try {
      const { email, senha } = req.body;
      if (!email || !senha) {
        return res
          .status(400)
          .json({ message: "Todos os campos são obrigatórios" });
      }

      const usuario = await this.usuarioRepository.findByEmail(email);
      if (!usuario || !usuario.ativo) {
        return res.status(401).json({ message: "Credenciais inválidas" });
      }

      const compare = await comparePassword(senha, usuario.senha);
      if (!compare) {
        return res.status(401).json({ message: "Senha inválida" });
      }

      const token = await this.authRepository.createToken(email);
      if (!token) {
        return res.status(401).json({ message: "Credenciais inválidas" });
      }

      const { senha: _, ...usuarioLogin } = usuario as Usuario;
      return res.status(200).json({
        usuario: usuarioLogin,
        token: token,
      });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  async forgotPassword(req: Request, res: Response) {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ message: "O email é obrigatório" });
      }

      const usuario = await this.usuarioRepository.findByEmail(email);
      if (!usuario) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      const resetToken = await this.authRepository.createPasswordResetToken(
        usuario.id
      );
      // Aqui você enviaria o resetToken por email
      res.status(200).json({
        message: "Token de redefinição gerado",
        token: resetToken, // Remova isso em produção para não expor o token
      });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  async resetPassword(req: Request, res: Response) {
    try {
      const { token, novaSenha } = req.body;
      if (!token || !novaSenha) {
        return res
          .status(400)
          .json({ message: "Token e nova senha são obrigatórios" });
      }

      const decoded = await this.authRepository.verifyToken(token);
      const usuario = await this.usuarioRepository.findById(decoded.id);

      if (!usuario) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      const senhaCriptografada = await hashPassword(novaSenha);
      await this.usuarioRepository.update(usuario.id, {
        senha: senhaCriptografada,
      });

      res.status(200).json({ message: "Senha redefinida com sucesso" });
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }
}
