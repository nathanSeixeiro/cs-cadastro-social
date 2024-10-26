import { Request, Response } from "express";
import ITrabalhoRepository from "../interfaces/trabalho-repository-interface";

export default class TrabalhoController {
  constructor(private trabalhoRepository: ITrabalhoRepository) {}

  async create(req: Request, res: Response) {
    try {
      const { authorization } = req.headers;
      if (!authorization) {
        throw new Error("Não autorizado");
      }
      const trabalho = await this.trabalhoRepository.create(req.body);
      if (!trabalho) {
        throw new Error("Erro ao criar o trabalho");
      }
      res.status(201).json(trabalho);
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
      const trabalhos = await this.trabalhoRepository.findAll();
      if (!trabalhos) {
        throw new Error("Nenhum trabalho encontrado");
      }
      res.status(200).json(trabalhos);
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
        throw new Error("ID do trabalho não fornecido");
      }
      const trabalho = await this.trabalhoRepository.findById(Number(id));
      if (!trabalho) {
        res.status(404).json({ message: "Trabalho não encontrado" });
        return;
      }
      res.status(200).json(trabalho);
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
        throw new Error("ID do trabalho não fornecido");
      }
      const trabalho = await this.trabalhoRepository.update(
        Number(id),
        req.body
      );
      if (!trabalho) {
        throw new Error("Erro ao atualizar o trabalho");
      }
      res.status(200).json(trabalho);
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
        throw new Error("ID do trabalho não fornecido");
      }
      await this.trabalhoRepository.delete(Number(id));
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
