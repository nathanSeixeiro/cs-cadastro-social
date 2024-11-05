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

const AssistList = () => {
  const navigate = useNavigate();
  const [assistidos, setAssistidos] = useState<Assistido[]>([]);

  useEffect(() => {
    const listarAssistidos = async () => {
      try {
        const response = await axios.get("http://localhost:3000/Assistidos/");
        const data = await response.data;
        setAssistidos(data); // Armazenando os dados recebidos no estado
      } catch (error) {
        console.error("Erro ao buscar assistidos:", error);
      }
    };

    listarAssistidos();
  }, []);

  async function alterarSituacao(event: React.FormEvent<HTMLFormElement>, id: number ) 
  {
    event?.preventDefault();
    const situacao = event.currentTarget.situacao.value;
   
    try {
      axios.put(`http://localhost:3000/Assistidos/update/${id}`, 
        {
          situacao: situacao
        }).then(() => {
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
            location.reload()
          }, 3000);
        }) .catch(() => {
          toast.error("Dados inválidos tente novamente!", {
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
        });
    } catch (error) {
      toast.error("Dados inválidos tente novamente!", {
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
    
  }

  return (
    <>
      <ToastContainer stacked className="text-start" />
      <div className="h-dvh overflow-auto w-full pl-[80px] pt-[3%] pr-[3%] flex flex-col justify-items-end text-end">
        <h1 className="font-bold text-3xl mb-2">Listagem</h1>
        <div className="flex flex-col p-2 gap-3">
          <div className="flex items-center justify-between h-fit gap-3">
            <input
              className={`rounded-xl px-7 py-4 inputSearch bg-[#F5F5F5] h-fit shadow-md opened`}
              placeholder="Pesquisar..."
            />
            <IconButton className="h-[50px] rounded-xl" icon={Filter} />
          </div>
          <Button
            className="p-6 rounded-xl"
            onClick={() => navigate("/assist-register")}
          >
            Novo Cadastro
          </Button>

          {assistidos.map((assistido) => (
            <Dialog key={assistido.id}>
              <DialogTrigger asChild>
                <article className="border-[1px] border-gray-400/50 border-solid rounded-3xl p-4 text-start">
                  <span className="font-bold text-gray-800">
                    {assistido.nome}
                  </span>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-800">
                      <b>Data de nascimento:</b>
                      <p>
                        {new Date(
                          assistido.data_nascimento
                        ).toLocaleDateString()}
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
                    Informe a situação atual do Assistido(a) {assistido.nome} por gentileza.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={(event) => alterarSituacao(event, assistido.id)} className="grid gap-4 py-4">
                  <ISelectLabel
                    label="Situação"
                    name="situacao"
                    placehoder="Ex: Em recuperação?"
                    className="custom-select-class"
                    value="Situação"
                    // onChange={handleSelectChange}
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
          ))}
        </div>
      </div>
    </>
  );
};

export default AssistList;
