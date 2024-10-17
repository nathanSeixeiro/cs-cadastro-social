import Assistido from "./Assistido";

type Trabalho = {
  id: number;
  profissao: string;
  atual: boolean;
  assistidoId?: number;
  assistido?: Assistido;
};

export default Trabalho;