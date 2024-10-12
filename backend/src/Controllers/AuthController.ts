import { Request, Response } from "express";

import Usuario from "./../Models/Usuario";
import IUsuarioRepository from "../interfaces/usuario-repository-interface";
import IAuthRepository from "../interfaces/auth-repository-interface";
import { comparePassword  }from "../utils/bycript";

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
    const { email, senha } = req.body;
    if (!email || !senha) {
      return res
        .status(400)
        .json({ message: "Todos os campos são obrigatórios" });
    }
    const usuario = await this.usuarioRepository.findByEmail(email);
    if (!usuario || !usuario.ativo ) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }
    const compare = await comparePassword(senha, usuario.senha);
    if (!compare) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    const token = await this.authRepository.login(email, senha);
    if (!token) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }
    return res.status(200).json({ token });
  }
}
