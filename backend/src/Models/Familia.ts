import Assistido from "./Assistido";

type Familia = {
  id: number;
  nome: string;
  parentesco: string;
  telefone: string;
  assistidoId: number;
  assistido?: Assistido;
};

export default Familia;
