import { Request, Response } from "express";
import IAvisoRepository from "../interfaces/aviso-repository-interface";

export default class AvisoController {
  constructor(private avisoRepository: IAvisoRepository) {}

  async create(req: Request, res: Response) {
    try {
      const aviso = await this.avisoRepository.create(req.body);
      res.status(201).json(aviso);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
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
      const avisos = await this.avisoRepository.findAll();
      res.status(200).json(avisos);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const aviso = await this.avisoRepository.update(Number(id), req.body);
      res.status(200).json(aviso);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  } 

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.avisoRepository.delete(Number(id));
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
