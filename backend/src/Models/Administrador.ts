import Aviso from "./Avisos";
import Usuario from "./Usuario";

type Administrador = Usuario & {
  confirmarAtivo(userId: number): void;
  deletarUsuario(userId: number): void;
  excluirAviso(avisoId: number): void;
  cadastrarAviso(aviso: Aviso): void;
  cadastrarNecessidade(necessidade: string): void;
  excluirNecessidade(necessidadeId: number): void;
};

export default Administrador;
