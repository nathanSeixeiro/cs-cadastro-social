import { prisma } from "../utils/prisma";
import Usuario from "../Models/Usuario";
import IUsuarioRepository from "../interfaces/usuario-repository-interface";

class UsuarioRepository implements IUsuarioRepository {
  async create(usuario: Usuario): Promise<object> {
    const newUsuario = await prisma.usuario.create({
      data: {
        nome: usuario.nome,
        email: usuario.email,
        senha: usuario.senha,
        ativo: true,
        telefone: usuario.telefone.toString(),
      },
    });
    return newUsuario;
  }

  async findById(id: number): Promise<Usuario | null> {
    const usuario = await prisma.usuario.findUnique({
      where: {
        id: id,
      },
    });

    if (!usuario) {
      return null;
    }
    return usuario as Usuario;
  }

  async findAll(): Promise<Usuario[]> {
    const usuarios = await prisma.usuario.findMany();
    return usuarios as Usuario[];
  }

  async update(id: number, usuario: Partial<Usuario>): Promise<object | null> {
    try {
      const updatedUsuario = await prisma.usuario.update({
        where: { id },
        data: {
          nome: usuario.nome,
          email: usuario.email,
          senha: usuario.senha,
          ativo: usuario.ativo,
          telefone: usuario.telefone?.toString(),
        },
      });
      return updatedUsuario;
    } catch (error) {
      console.error('Erro ao atualizar o usuário:', error);
      return null;
    }
  }

  async delete(id: number): Promise<void> {
    return await prisma.usuario
      .delete({
        where: {
          id: id,
        },
      })
      .then(() => {
        return;
      })
      .catch((error) => {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
      });
  }

  async setStatus(id: number, ativo: boolean): Promise<void> {
    return await prisma.usuario
      .update({
        where: {
          id: id,
        },
        data: {
          ativo: ativo,
        },
      })
      .then(() => {
        return;
      })
      .catch((error) => {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
      });
  }
}

export default UsuarioRepository;
