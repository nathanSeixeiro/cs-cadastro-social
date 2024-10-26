import Familia from "../Models/Familia";
import { IFamiliaRepository } from "./../interfaces/familia-repository-interface";
import { prisma } from "../utils/prisma";

class FamiliaRepository implements IFamiliaRepository {
  async create(familia: Familia): Promise<Familia> {
    const newFamilia = await prisma.familia.create({
      data: {
        nome: familia.nome,
        parentesco: familia.parentesco,
        telefone: familia.telefone,
        assistidoId: familia.assistidoId,
      },
    });
    return newFamilia as Familia;
  }
  async findByAssistidoId(id: number): Promise<Familia[]> {
    const familias = await prisma.familia.findMany({
      where: {
        assistidoId: id,
      },
    });
    return familias as Familia[];
  }
  async findById(id: number): Promise<Familia | null> {
    const familia = await prisma.familia.findUnique({
      where: {
        id,
      },
    });
    return familia as Familia | null;
  }
  async update(id: number, familia: Familia): Promise<Familia> {
    const updatedFamilia = await prisma.familia.update({
      where: {
        id,
      },
      data: {
        nome: familia.nome,
        parentesco: familia.parentesco,
        telefone: familia.telefone,
        assistidoId: familia.assistidoId,
      },
    });
    return updatedFamilia as Familia;
  }
  async delete(id: number): Promise<void> {
    await prisma.familia.delete({
      where: {
        id,
      },
    })
  }
}

export default FamiliaRepository;
