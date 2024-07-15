import Aviso from "@/Models/Avisos";

interface IAvisoRepositoryInterfaceAvisoRepository {
  create(aviso: Aviso): Promise<object>;
  findById(id: number): Promise<Aviso | null>;
  findAll(): Promise<Aviso[]>;
  update(id: number, aviso: Aviso): Promise<Aviso>;
  delete(id: number): Promise<void>;
  deleteOlderThan(date: Date): Promise<void>;
}

export default IAvisoRepositoryInterfaceAvisoRepository;
