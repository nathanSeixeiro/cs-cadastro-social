import { Request, Response } from "express";
import IAssistidoRepository from "@/interfaces/assistido-repository-interface";
import Assistido from "../Models/Assistido";

export default class AssistidoController {
    constructor(private assistidoRepository: IAssistidoRepository) { }

    async create(req: Request, res: Response) {
        try {
            const assistido = await this.assistidoRepository.create(req.body as Assistido)
            if (!assistido) {
                throw new Error("Erro ao criar assistido")
            }
            res.status(201).json(assistido)
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async findById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id) {
                throw new Error("ID do assistido não fornecido")
            }
            const assistido = await this.assistidoRepository.findById(Number(id))
            if (!assistido) {
                res.status(404).json({ message: "Assistido não encontrato" })
                return
            }
            res.status(200).json(assistido);
        } catch (error: any) {
            res.status(400).json({ message: error.message })
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const assistidos = await this.assistidoRepository.findAll();
            if (!assistidos) {
                throw new Error("Nenhum assistido encontrado");
            }
            res.status(200).json(assistidos);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async updateState(req: Request, res: Response) {
        try {
            const { id } = req.params;
            console.log(id)
            console.log(req.body)
            if (!id) {
                throw new Error("ID do aviso não fornecido");
            }

            const assistido = await this.assistidoRepository.updateStatus(Number(id), req.body.situacao);

            if (assistido != null) {
                throw new Error("Erro ao atualizar o status do assistido");
            }
            res.status(200).json(assistido);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async uploadPhoto(req: Request, res: Response)
    {
        try {
            const { id } = req.params;
            const filePath = `/uploads/${req.file?.filename}`;
        
            await this.assistidoRepository.uploadPhoto(Number(id), filePath);
        
            res.status(200).json({ message: "Foto enviada com sucesso", path: filePath });
          } catch (error) {
            res.status(500).json({ message: error });
          }
    }
}
