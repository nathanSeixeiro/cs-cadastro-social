import Familia from "../Models/Familia";

export interface IFamiliaRepository {
  create(familia: Familia): Promise<Familia>;
  findByAssistidoId(id: number): Promise<Familia[]>;
  findById(id: number): Promise<Familia | null>;
  update(id: number, familia: Familia): Promise<Familia>;
  delete(id: number): Promise<void>;
}