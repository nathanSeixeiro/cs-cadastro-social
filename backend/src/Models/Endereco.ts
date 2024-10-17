import Assistido from "./Assistido";

type Endereco = {
  id: number;
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  assistidoId?: number;
  assistido?: Assistido;
};

export default Endereco;