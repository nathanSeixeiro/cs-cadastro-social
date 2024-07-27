import Aviso from "@/Models/Avisos";
import IAvisoRepository from "@/interfaces/aviso-repository-interface";
import { prisma } from "../utils/prisma";

class AvisoRepository implements IAvisoRepository {
  async create(aviso: Aviso): Promise<object> {
    const newAviso = await prisma.aviso.create({
      data: {
        titulo: aviso.titulo,
        descricao: aviso.descricao,
      },
    });
    return newAviso;
  }

  async findById(id: number): Promise<Aviso | null> {
    const aviso = await prisma.aviso.findUnique({
      where: { id },
    });
    return aviso as Aviso | null;
  }

  async findAll(): Promise<Aviso[]> {
    const avisos = await prisma.aviso.findMany();
    return avisos;
  }

  async update(id: number, aviso: Aviso): Promise<Aviso> {
    const updatedAviso = await prisma.aviso.update({
      where: { id },
      data: {
        titulo: aviso.titulo,
        descricao: aviso.descricao,
      },
    });
    return updatedAviso;
  }
  async delete(id: number): Promise<void> {
    await prisma.aviso.delete({
      where: { id },
    });
  }
  async deleteOlderThan(date: Date): Promise<void> {
    console.log(date);
    await prisma.aviso.deleteMany({
      where: {
        createdAt: {
          lt: date,
        },
      },
    })
  }
}

export default AvisoRepository;



