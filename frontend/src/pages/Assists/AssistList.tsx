import { IconButton } from "@/components/internals/buttons/iconButton";
import Filter from "@/assets/filter.svg";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ISelectLabel } from "@/components/internals/fieldSets/selectLabel";
import axios from "axios";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { InputLabel } from "@/components/internals/fieldSets/inputLabel";

export interface Assistido {
  id: number;
  foto: string;
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

const AssistList = () => {
  const navigate = useNavigate();
  const [assistidos, setAssistidos] = useState<Assistido[]>([]);
  const [searchText, setSearchText] = useState("");
  const [situacaoFilter, setSituacaoFilter] = useState<string | null>(null);
  const [idadeFilter, setIdadeFilter] = useState<number>(0);
  const [assistidosFiltrados, setAssistidosFiltrados] = useState<Assistido[]>([]);

  useEffect(() => {
    const listarAssistidos = async () => {
      try {
        const response = await axios.get("https://api-cs.software/Assistidos/");
        const data = await response.data;
        setAssistidos(data);
        setAssistidosFiltrados(data); // Set filtered list initially
      } catch (error) {
        console.error("Erro ao buscar assistidos:", error);
      }
    };

    listarAssistidos();
  }, []);

  useEffect(() => {
    // Apply filters based on search text, situation, and age filter
    const filteredAssistidos = assistidos.filter((assistido) => {
      const matchesSearchText = assistido.nome
        .toLowerCase()
        .includes(searchText.toLowerCase());
      const matchesSituacao = situacaoFilter
        ? assistido.situacao === situacaoFilter
        : true;

      // Calculate the assistido's age
      const birthDate = new Date(assistido.data_nascimento);
      const age = new Date().getFullYear() - birthDate.getFullYear();

      // Age match logic

      // const numberFormat = parseInt(idadeFilter);
      console.log(age, idadeFilter);
      const matchesIdade = idadeFilter ? age === idadeFilter : true;

      console.log(matchesSearchText, matchesSituacao, matchesIdade);
      return matchesSearchText && matchesSituacao && matchesIdade;
    });

    setAssistidosFiltrados(filteredAssistidos);
  }, [searchText, situacaoFilter, idadeFilter, assistidos]);

  const alterarSituacao = async (
    event: React.FormEvent<HTMLFormElement>,
    id: number
  ) => {
    event.preventDefault();
    const situacao = event.currentTarget.situacao.value;

    try {
      await axios.put(`https://api-cs.software/Assistidos/update/${id}`, {
        situacao,
      });
      toast.success("Situação alterada com sucesso", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

      setTimeout(() => {
        location.reload();
      }, 3000);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Dados inválidos, tente novamente!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const filtrarNome = (texto: string) => {
    setSearchText(texto);
  };

  const filtrarSituacaoIdade = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const situacao = event.currentTarget.situacao.value;
    const idade = parseInt(event.currentTarget.idade.value);
    if (situacao != "") {
      setSituacaoFilter(situacao);
    }
    if (idade != null) {
      setIdadeFilter(idade);
    }
  };

  return (
    <>
      <ToastContainer stacked className="text-start" />
      <div className="h-dvh overflow-auto w-full pl-[80px] pt-[3%] pr-[3%] flex flex-col justify-items-end text-end">
        <h1 className="font-bold text-3xl mb-2">Listagem</h1>
        <div className="flex flex-col p-2 gap-3">
          <div className="flex items-center justify-between h-fit gap-3">
            <input
              className="rounded-xl px-7 py-4 inputSearch bg-[#F5F5F5] h-fit shadow-md opened outline-none"
              placeholder="Pesquisar..."
              onChange={(e) => filtrarNome(e.target.value)}
            />
            <Dialog>
              <DialogTrigger asChild>
                <IconButton className="h-[50px] rounded-xl" icon={Filter} />
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>Filtrar Assistidos</DialogTitle>
                <form
                  onSubmit={filtrarSituacaoIdade}
                  className="grid gap-4 py-4"
                >
                  <ISelectLabel
                    label="Situação"
                    name="situacao"
                    placehoder="Ex: Em recuperação?"
                    className="custom-select-class"
                    value="Situação"
                    required={true}
                    readonly={false}
                    childs={[
                      { text: "De rua", value: "De rua" },
                      { text: "Em recuperação", value: "Em recuperação" },
                      { text: "Recuperado", value: "Recuperado" },
                    ]}
                  />
                  <InputLabel
                    label="Idade"
                    name="idade"
                    type="number"
                    required={false}
                  />
                  <DialogFooter>
                    {assistidosFiltrados.length != assistidos.length && (
                      <Button
                        type="button"
                        onClick={() => setAssistidosFiltrados(assistidos)}
                        variant={"destructive"}
                      >
                        Limpar Filtros
                      </Button>
                    )}

                    <Button type="submit" className="mb-2">
                      Aplicar Filtros
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          <Button
            className="p-6 rounded-xl"
            onClick={() => navigate("/assist-register")}
          >
            Novo Cadastro
          </Button>

          {assistidosFiltrados.length > 0 ? (
            assistidosFiltrados.map((assistido) => (
              <Dialog key={assistido.id}>
                <DialogTrigger asChild>
                  <article className="border-[1px] border-gray-400/50 border-solid rounded-3xl p-4 text-start">
                    {/* <img className="h-14 w-14 rounded-full object-cover object-center" src={`https://api-cs.software${assistido.foto}`}/> */}
                    <img
                      className="h-14 w-14 rounded-full object-cover object-center"
                      src={assistido.foto ? `https://api-cs.software${assistido.foto}` : "../../assets/default-avatar.png"}
                      alt={`Foto de ${assistido.nome}`}
                    />
                    <span className="font-bold text-gray-800">
                      {assistido.nome}
                    </span>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-800">
                        <b>Data de nascimento:</b>
                        <p>
                          {new Date(assistido.data_nascimento)
                            .toISOString()
                            .split("T")[0]
                            .split("-")
                            .reverse()
                            .join("/")}
                        </p>
                        <p>
                          <b>Situação:</b> {assistido.situacao}
                        </p>
                      </div>
                      <span className="text-center font-semibold text-gray-800">
                        {new Date().getFullYear() -
                          new Date(assistido.data_nascimento).getFullYear()}
                        <br />
                        Anos
                      </span>
                    </div>
                  </article>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Editar Situação</DialogTitle>
                    <DialogDescription>
                      Informe a situação atual do Assistido(a) {assistido.nome}{" "}
                      por gentileza.
                    </DialogDescription>
                  </DialogHeader>
                  <form
                    onSubmit={(event) => alterarSituacao(event, assistido.id)}
                    className="grid gap-4 py-4"
                  >
                    <ISelectLabel
                      label="Situação"
                      name="situacao"
                      placehoder="Ex: Em recuperação?"
                      className="custom-select-class"
                      value="Situação"
                      required={true}
                      readonly={false}
                      childs={[
                        { text: "De rua", value: "De rua" },
                        { text: "Em recuperação", value: "Em recuperação" },
                        { text: "Recuperado", value: "Recuperado" },
                      ]}
                    />
                    <DialogFooter>
                      <Button type="submit">Alterar</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            ))
          ) : (
            <p className="text-center w-full">
              Não há usuários com estas informações
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default AssistList;
