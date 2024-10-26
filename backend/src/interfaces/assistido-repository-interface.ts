import SituacaoAssistidoEnum from "@/Models/SituacaoEnum";
import Assistido from "../Models/Assistido";

interface IAssistidoRepository {
  create(assistido: Assistido): Promise<object>;
  findById(id: number): Promise<Assistido | null>;
  findAll(): Promise<Assistido[]>;
  update(id: number): Promise<object>;
  updateStatus(id: number, status: SituacaoAssistidoEnum): Promise<void>;
}

export default IAssistidoRepository;
