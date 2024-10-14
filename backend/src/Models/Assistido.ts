type Assistido = {
  nome: string;
  sexo: string;
  ajuda: string[];
  filhos: string[];
  situacao: string;
  descricao: string;
  endereco: string[];
  trabalho: string[];
  ativo: boolean;
  created_at: string;
  updated_at: string;
  motivo_saiu: string;
  estado_civil: string;
  data_nascimento: Date;
  existe_contato: boolean;
  familiar_proximo: boolean;
  informacao_medica: string;
};

export default Assistido;
