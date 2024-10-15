import { Request, Response } from "express";
import IAvisoRepository from "../interfaces/aviso-repository-interface";
import Aviso from "../Models/Avisos";

export default class AvisoController {
  constructor(private avisoRepository: IAvisoRepository) {}

  async create(req: Request, res: Response) {
    try {
      const { authorization } = req.headers;
      if (!authorization) {
        throw new Error("Não autorizado");
      }
      const aviso = await this.avisoRepository.create(req.body as Aviso);
      if (!aviso) {
        throw new Error("Erro ao criar o aviso");
      }
      res.status(201).json(aviso);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const { authorization } = req.headers;
      if (!authorization) {
        throw new Error("Não autorizado");
      }
      const { id } = req.params;
      if (!id) {
        throw new Error("ID do aviso não fornecido");
      }
      const aviso = await this.avisoRepository.findById(Number(id));
      if (!aviso) {
        res.status(404).json({ message: "Aviso não encontrado" });
        return;
      }
      res.status(200).json(aviso);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const { authorization } = req.headers;
      if (!authorization) {
        throw new Error("Não autorizado");
      }
      const avisos = await this.avisoRepository.findAll();
      if (!avisos) {
        throw new Error("Nenhum aviso encontrado");
      }
      res.status(200).json(avisos);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { authorization } = req.headers;
      if (!authorization) {
        throw new Error("Não autorizado");
      }
      const { id } = req.params;
      if (!id) {
        throw new Error("ID do aviso não fornecido");
      }
      const aviso = await this.avisoRepository.update(Number(id), req.body);
      if (!aviso) {
        throw new Error("Erro ao atualizar o aviso");
      }
      res.status(200).json(aviso);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { authorization } = req.headers;
      if (!authorization) {
        throw new Error("Não autorizado");
      }
      const { id } = req.params;
      if (!id) {
        throw new Error("ID do aviso não fornecido");
      }
      await this.avisoRepository.delete(Number(id));
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
