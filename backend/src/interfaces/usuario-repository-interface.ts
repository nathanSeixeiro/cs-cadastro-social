import Usuario from './../Models/Usuario';

interface IUsuarioRepository {
  create(Usuario: Usuario): Promise<object>;
  findById(id: number): Promise<Usuario | null>;
  findAll(): Promise<Usuario[]>;
  // update(id: number, Usuario: Partial<Usuario>): Promise<object>;
  update(id: number, usuario: Partial<Usuario>): Promise<object | null>
  delete(id: number): Promise<void>;
  setStatus(id: number, ativo: boolean): Promise<void>;
}

export default IUsuarioRepository;
