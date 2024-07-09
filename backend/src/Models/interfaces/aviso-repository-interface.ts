import Aviso from "./Avisos";

interface AvisoRepository {
  create(aviso: Aviso): Promise<Aviso>;
  findById(id: number): Promise<Aviso | null>;
  findAll(): Promise<Aviso[]>;
  update(id: number, aviso: Aviso): Promise<Aviso>;
  delete(id: number): Promise<void>;
}

export default AvisoRepository;
