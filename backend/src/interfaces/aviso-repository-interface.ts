import Aviso from "@/Models/Avisos";

interface AvisoRepositoryInterface {
  create(aviso: Aviso): Promise<object>;
  findById(id: number): Promise<Aviso | null>;
  findAll(): Promise<Aviso[]>;
  update(id: number, aviso: Aviso): Promise<Aviso>;
  delete(id: number): Promise<void>;
}

export default AvisoRepositoryInterface;
