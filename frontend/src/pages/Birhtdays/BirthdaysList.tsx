import { IconButton } from "@/components/internals/buttons/iconButton";
import Gift from "@/assets/gift.svg";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

interface Assistido {
  id: number;
  nome: string;
  data_nascimento: string;
  sexo: string;
  situacao: string;
  familiar_proximo: boolean;
  estado_civil: string;
  motivo_saiu: string;
  filhos: boolean;
  existe_contato: boolean;
  descricao: string;
  ativo: boolean;
  usuarioId: number;
}

const BirthdaysList = () => {
  const navigate = useNavigate();
  const [assistidos, setAssistidos] = useState<Assistido[]>([]);

  const aniversariantes = assistidos.filter((assistido) => {
    const dataNascimento = new Date(assistido.data_nascimento);
    const mesNascimento = dataNascimento.getMonth(); // Mês de nascimento (0-11)
    const mesAtual = new Date().getMonth(); // Mês atual (0-11)
    return mesNascimento === mesAtual;
  });

  async function descobrirData() {
    assistidos.map((item) => {
      console.log(item.data_nascimento);
    });
  }

  useEffect(() => {
    const listarAssistidos = async () => {
      try {
        const response = await axios.get("http://localhost:3000/Assistidos/");
        const data = await response.data;
        setAssistidos(data);
        console.log(aniversariantes); // Armazenando os dados recebidos no estado
      } catch (error) {
        console.error("Erro ao buscar assistidos:", error);
      }
    };

    listarAssistidos();
  }, []);

  return (
    <>
      <div className="h-dvh overflow-auto w-full pl-[80px] pt-[3%] pr-[3%] flex flex-col justify-items-end text-end">
        <h1 className="font-bold text-3xl mb-2" onClick={descobrirData}>
          Aniversariantes
        </h1>
        <div className="flex flex-col p-2 gap-3">
          {aniversariantes.length > 0 ? (
            aniversariantes.map((aniversariante) => (
              <article
                key={aniversariante.id}
                className="border-[1px] border-gray-400/50 border-solid rounded-3xl p-4 text-start"
              >
                <div className="flex items-center justify-between gap-4">
                  <img src={Gift} />
                  <div className="text-sm text-gray-800 flex flex-col w-full">
                    <span className="font-bold text-gray-800 text-md">
                      {aniversariante.nome.split(" ")[0]} -{" "}
                      {new Date(aniversariante.data_nascimento)
                        .toISOString()
                        .split("T")[0]
                        .split("-")
                        .reverse()
                        .join("/")}
                    </span>
                    <p className="text-[11px] text-blue-500 line-clamp-2">
                      Não esquece de parabeniza-lo(a)
                    </p>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <p>Não há aniversariantes neste mês.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default BirthdaysList;
