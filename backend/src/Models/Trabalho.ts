import Assistido from "./Assistido";

type Trabalho = {
  id: number;
  profissao: string;
  atual: boolean;
  assistidoId: number;
  assistidos?: Assistido[];
};

export default Trabalho;