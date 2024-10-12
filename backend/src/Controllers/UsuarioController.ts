import { Request, Response } from "express";

import Usuario from "../Models/Usuario";
import IUsuarioRepository from "../interfaces/usuario-repository-interface";

export default class UsuarioController {
  constructor(private usuarioRepository: IUsuarioRepository) {}

  async create(req: Request, res: Response) {
    try {
      const usuario = await this.usuarioRepository.create(req.body as Usuario);
      if (!usuario) {
        throw new Error("Erro ao criar o usuario");
      }
      const {senha: _, ...novoUsuario} = usuario as Usuario;
      res.status(201).json(novoUsuario);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        throw new Error("ID do usuario não fornecido");
      }
      const usuario = await this.usuarioRepository.findById(Number(id));
      if (!usuario) {
        res.status(404).json({ message: "usuario não encontrado" });
        return;
      }
      res.status(200).json(usuario);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async findByEmail(req: Request, res: Response) {
    try {
      const { email } = req.params;
      if (!email) {
        throw new Error("Email do usuario não fornecido");
      }
      const usuario = await this.usuarioRepository.findByEmail(email);
      if (!usuario) {
        res.status(404).json({ message: "usuario não encontrado" });
        return;
      }
      res.status(200).json(usuario);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
  async findAll(req: Request, res: Response) {
    try {
      const usuarios = await this.usuarioRepository.findAll();
      if (!usuarios) {
        throw new Error("Nenhum usuario encontrado");
      }
      res.status(200).json(usuarios);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const usuarioRequest: Partial<Usuario> = req.body;
      if (!id) {
        throw new Error("ID do usuario não fornecido");
      }
      const usuario = await this.usuarioRepository.update(Number(id), usuarioRequest);
      if (!usuario) {
        throw new Error("Erro ao atualizar o usuario");
      }
      res.status(200).json(usuario);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        throw new Error("ID do usuario não fornecido");
      }
      await this.usuarioRepository.delete(Number(id));
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async setStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        throw new Error("ID do usuario não fornecido");
      }
      await this.usuarioRepository.setStatus(Number(id), req.body.ativo);
      res.status(200).json({ message: `Status do usuario ${id} alterado para ${req.body.ativo}` });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}