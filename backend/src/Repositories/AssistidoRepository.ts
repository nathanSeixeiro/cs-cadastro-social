import Assistido from "@/Models/Assistido";
import IAssistidoRepository from "@/interfaces/assistido-repository-interface";
import { prisma } from "../utils/prisma"

class AssistidoRepository implements IAssistidoRepository {
    async create(assistido: Assistido): Promise<object> {
        const newAssistido = await prisma.assistido.create({
            data: {

                
            }
        });
        return newAssistido
    }

    async findById(id: number): Promise<Assistido | null> {
        const assistido = await prisma.assistido.findUnique({
            where: { id },
        });
        return assistido as Assistido | null;
    };

    async findAll(): Promise<Assistido[]> {
        const assistidos = await prisma.assistido.findMany();
        return assistidos;
    }

    async updateState(id: number, assistido: Assistido): Promise<Assistido>{
        const updateState = await prisma.assistido.update({
            where: { id },
            data: {
                state: assistido.ativo,
            }
        });
        return updateState;
    }
}

export default AssistidoRepository