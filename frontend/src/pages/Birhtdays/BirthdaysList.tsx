// import { IconButton } from "@/components/internals/buttons/iconButton";
import Gift from "@/assets/gift.svg";
// import { Button } from "@/components/ui/button";
// import { useNavigate } from "react-router-dom";
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
  // const navigate = useNavigate();
  const [assistidos, setAssistidos] = useState<Assistido[]>([]);

  const aniversariantesHoje = assistidos.filter((assistido) => {
    const dataNascimento = new Date(assistido.data_nascimento);
    const hoje = new Date();

    return (
      dataNascimento.getDate() === hoje.getDate() &&
      dataNascimento.getMonth() === hoje.getMonth()
    );
  });

  const aniversariantesDaSemana = assistidos.filter((assistido) => {
    const dataNascimento = new Date(assistido.data_nascimento);
    const hoje = new Date();

    // Ajustar para o ano atual
    dataNascimento.setFullYear(hoje.getFullYear());

    const diaDaSemanaAtual = hoje.getDay();
    const inicioSemana = new Date(hoje);
    inicioSemana.setDate(hoje.getDate() - diaDaSemanaAtual); // Domingo

    const fimSemana = new Date(inicioSemana);
    fimSemana.setDate(inicioSemana.getDate() + 6); // Sábado

    return (
      dataNascimento >= inicioSemana &&
      dataNascimento <= fimSemana &&
      dataNascimento.getMonth() === hoje.getMonth()
    );
  });

  useEffect(() => {
    const listarAssistidos = async () => {
      try {
        const response = await axios.get("http://localhost:3000/Assistidos/");
        setAssistidos(response.data);
      } catch (error) {
        console.error("Erro ao buscar assistidos:", error);
      }
    };

    listarAssistidos();
  }, []);

  return (
    <>
      <div className="h-dvh overflow-auto w-full pl-[80px] pt-[3%] pr-[3%] flex flex-col justify-items-end text-end">
        <h1 className="font-bold text-3xl mb-2">Aniversariantes</h1>

        <h2 className="font-bold text-lg text-gray-500 mb-2">Hoje</h2>
        <div className="flex flex-col p-2 gap-3">
          {aniversariantesHoje.length > 0 ? (
            aniversariantesHoje.map((aniversariante) => (
              <article
                key={aniversariante.id}
                className="border-[1px] border-gray-400/50 border-solid rounded-3xl p-4 text-start"
              >
                <div className="flex items-center justify-between gap-4">
                  <img src={Gift} alt="Gift Icon" />
                  <div className="text-sm text-gray-800 flex flex-col w-full">
                    <span className="font-bold text-gray-800 text-md">
                      {aniversariante.nome.split(" ")[0]} - {new Date(aniversariante.data_nascimento)
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
            <p>Não há aniversariantes hoje.</p>
          )}
        </div>

        <h2 className="font-bold text-lg text-gray-500 mb-2">Na Semana</h2>
        <div className="flex flex-col p-2 gap-3">
          {aniversariantesDaSemana.length > 0 ? (
            aniversariantesDaSemana.map((aniversariante) => (
              <article
                key={aniversariante.id}
                className="border-[1px] border-gray-400/50 border-solid rounded-3xl p-4 text-start"
              >
                <div className="flex items-center justify-between gap-4">
                  <img src={Gift} alt="Gift Icon" />
                  <div className="text-sm text-gray-800 flex flex-col w-full">
                    <span className="font-bold text-gray-800 text-md">
                      {aniversariante.nome.split(" ")[0]} - {new Date(aniversariante.data_nascimento)
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
            <p>Não há aniversariantes nesta semana.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default BirthdaysList;
