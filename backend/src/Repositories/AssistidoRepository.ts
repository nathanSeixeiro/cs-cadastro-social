import { prisma } from "../utils/prisma";
import Assistido from "../Models/Assistido";
import IAssistidoRepository from "../interfaces/assistido-repository-interface";
import SituacaoAssistidoEnum from "@/Models/SituacaoEnum";

class AssistidoRepository implements IAssistidoRepository {
  async create(assistido: Assistido): Promise<object> {
    const newAssistido = await prisma.assistido.create({
      data: {
        nome: assistido.nome,
        data_nascimento: assistido.data_nascimento,
        sexo: assistido.sexo,
        situacao: assistido.situacao,
        familiar_proximo: assistido.familiar_proximo,
        estado_civil: assistido.estado_civil,
        motivo_saiu: assistido.motivo_saiu,
        filhos: assistido.filhos,
        existe_contato: assistido.existe_contato,
        descricao: assistido.descricao,
        ativo: assistido.ativo,
        usuarioId: assistido.usuarioId,
      },
    });
    return newAssistido;
  }

  async findById(id: number): Promise<Assistido | null> {
    const assistido = await prisma.assistido.findUnique({
      where: { id },
    });
    return assistido as Assistido | null;
  }

  async findAll(): Promise<Assistido[]> {
    const assistidos = await prisma.assistido.findMany();
    return assistidos as Assistido[];
  }

  async update(id: number): Promise<object> {
    const assistido = await prisma.assistido.findUnique({
      where: { id },
      include: {
        trabalhos: true,
        familia: true,
      },
    });
    if (!assistido) {
      throw new Error("Assistido nao encontrado!");
    }
    return assistido;
  }

  async updateStatus(id: number, status: SituacaoAssistidoEnum): Promise<void> {
    const assistido = await prisma.assistido.update({
      where: { id },
      data: {
        situacao: status,
      },
    });
    if (!assistido) {
      throw new Error("Assistido nao encontrado!");
    }
  }

  async uploadPhoto(id: number, filePath: string): Promise<void> {
    const assistido = await prisma.assistido.findUnique({
      where: { id },
    });

    if (!assistido) {
      throw new Error("Assistido nao encontrado!");
    }

    // Atualiza o campo de foto no banco
    await prisma.assistido.update({
      where: { id },
      data: {
        foto: filePath,
      },
    });
  }
}

export default AssistidoRepository;
