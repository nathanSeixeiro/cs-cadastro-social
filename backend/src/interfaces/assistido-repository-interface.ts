import Familia from "../Models/Familia";
import Endereco from "../Models/Endereco";
import Trabalho from "../Models/Trabalho";
import Assistido from "../Models/Assistido";
import InformacaoMedica from "../Models/InformacaoMedica";

type Retorno = {
  assistido: Assistido;
  endereco: Endereco;
  Trabalho: Trabalho;
  InformacaoMedica: InformacaoMedica;
  Familia: Familia;
};
interface IAssistidoRepository {
  create(assistido: Assistido): Promise<object>;
  findById(id: number): Promise<Assistido | null>;
  findAll(): Promise<Assistido[]>;
  updateState(id: number, assistido: Assistido): Promise<Retorno>;
}

export default IAssistidoRepository;
