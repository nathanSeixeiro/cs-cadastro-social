import Usuario from "./Usuario";
import Familia from "./Familia";
import Endereco from "./Endereco";
import Trabalho from "./Trabalho";
import SituacaoAssistidoEnum from "./SituacaoEnum";

type Assistido = {
  id: number;
  foto?: string;
  nome: string;
  data_nascimento: Date;
  sexo: string;
  situacao: SituacaoAssistidoEnum;
  familiar_proximo: boolean;
  estado_civil: string;
  motivo_saiu: string;
  filhos: boolean;
  existe_contato: boolean;
  descricao: string;
  ativo: boolean;
  usuarioId?: number;
  usuario?: Usuario;
  endereco: Endereco[];
  trabalhos?: Trabalho[];
  // informacoes_medicas?: InformacaoMedica[];
  familia?: Familia[];
};

export default Assistido;
