import jwt from "jsonwebtoken";
import { Request, Response } from "express";

import Usuario from "./../Models/Usuario";
import { comparePassword } from "../utils/bycript";
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
          .json({ message: "Todos os campos são obrigatórios" });
      }
      const usuario = await this.usuarioRepository.findByEmail(email);
      if (!usuario || !usuario.ativo) {
        return res.status(401).json({ message: "Credenciais inválidas" });
      }
      const compare = await comparePassword(senha, usuario.senha);
      if (!compare) {
        return res.status(401).json({ message: "senha inválida" });
      }

      const token = await this.authRepository.createToken(email);
      if (!token) {
        return res.status(401).json({ message: "Credenciais inválidas" });
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
}
