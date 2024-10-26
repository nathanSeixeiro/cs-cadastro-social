import Assistido from "./Assistido";

type InformacaoMedica = {
  id: number;
  descricao: string;
  assistidoId?: number;
  assistido?: Assistido;
};

export default InformacaoMedica;
