import Trabalho from "../Models/Trabalho";
import { prisma } from "../utils/prisma";
import ITrabalhoRepository from "../interfaces/trabalho-repository-interface";

export default class TrabalhoRepository implements ITrabalhoRepository {
  async create(trabalho: Trabalho): Promise<Trabalho> {
    const newTrabalho = await prisma.trabalho.create({
      data: {
        profissao: trabalho.profissao,
        atual: trabalho.atual,
        assistidoId: trabalho.assistidoId,
      },
    });
    return newTrabalho as Trabalho;
  }

  async findById(id: number): Promise<Trabalho | null> {
    const trabalho = await prisma.trabalho.findUnique({
      where: { id },
    });
    return trabalho as Trabalho | null;
  }

  async findAll(): Promise<Trabalho[]> {
    const trabalhos = await prisma.trabalho.findMany();
    return trabalhos as Trabalho[];
  }

  async update(id: number, Trabalho: Trabalho): Promise<Trabalho> {
    const updatedTrabalho = await prisma.trabalho.update({
      where: { id },
      data: {
        profissao: Trabalho.profissao,
        atual: Trabalho.atual,
        assistidoId: Trabalho.assistidoId,
      },
    });
    return updatedTrabalho as Trabalho;
  }

  async delete(id: number): Promise<void> {
    await prisma.trabalho.delete({
      where: { id },
    });
  }
}
