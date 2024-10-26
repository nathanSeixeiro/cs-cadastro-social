import { Request, Response } from "express";
import { IFamiliaRepository } from "@/interfaces/familia-repository-interface";

export default class FamiliaController {
  constructor(private familiaRepository: IFamiliaRepository) {}

  async create(req: Request, res: Response) {
    try {
      const {authorization} = req.headers;
      if (!authorization) {
        return res.status(401).json({ message: "Não autorizado" });
      }
      const familia = await this.familiaRepository.create(req.body);
      if (!familia) {
       return res.status(500).json({ message: "Erro ao criar a familia" });
      }
      res.status(201).json(familia);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  async findByUsuario(req: Request, res: Response) {
    try {
      const {authorization} = req.headers;
      if (!authorization) {
        return res.status(401).json({ message: "Não autorizado" });
      }
      const familias = await this.familiaRepository.findByAssistidoId(req.body.assistidoId);
      if (!familias) {
        return res.status(404).json({ message: "Nenhuma familia encontrada" });
      }
      res.status(200).json(familias);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const {authorization} = req.headers;
      if (!authorization) {
        return res.status(401).json({ message: "Não autorizado" });
      }
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ message: "ID da familia não fornecido" });
      }
      const familia = await this.familiaRepository.findById(Number(id));
      if (!familia) {
        return res.status(404).json({ message: "Familia não encontrada" });
      }
      res.status(200).json(familia);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const {authorization} = req.headers;
      if (!authorization) {
        return res.status(401).json({ message: "Não autorizado" });
      }
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ message: "ID da familia não fornecido" });
      }
      const familia = await this.familiaRepository.update(Number(id), req.body);
      if (!familia) {
        return res.status(404).json({ message: "Familia não encontrada" });
      }
      res.status(200).json(familia);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const {authorization} = req.headers;
      if (!authorization) {
        return res.status(401).json({ message: "Não autorizado" });
      }
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ message: "ID da familia não fornecido" });
      }
      await this.familiaRepository.delete(Number(id));
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
}