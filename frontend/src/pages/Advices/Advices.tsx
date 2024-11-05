import { Plus } from "lucide-react";
import Advice from "@/assets/advice.svg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { InputLabel } from "@/components/internals/fieldSets/inputLabel";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Bounce, toast, ToastContainer } from "react-toastify";

interface AdviceProps {
  id: number;
  titulo: string;
  descricao: string;
  quadroAvisoId: null;
  createdAt: Date;
}

const Advices = () => {
  const navigate = useNavigate();
  const [advices, setAdvices] = useState<AdviceProps[]>([]);

  async function alterarAviso(event: React.FormEvent<HTMLFormElement>,id: number) 
  {
    event?.preventDefault();
    const token = sessionStorage.getItem("token");
    const titulo = event.currentTarget.titulo.value;
    const descricao = event.currentTarget.descricao.value;

    axios.put(`http://localhost:3000/Aviso/update/${id}`, 
      {
        titulo: titulo,
        descricao: descricao
      },           
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
      })
  }

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const listarAvisos = async () => {
      try {
        const response = await axios.get("http://localhost:3000/Aviso/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAdvices(response.data); // Armazenando os dados recebidos no estado
      } catch (error) {
        console.error("Erro ao buscar avisos:", error);
      }
    };

    listarAvisos();
  }, []);

  return (
    <>
          <ToastContainer stacked className="text-start" />

      <div className="h-dvh overflow-auto w-full pl-[80px] pt-[3%] pr-[3%] flex flex-col justify-items-end text-end">
        <h1 className="font-bold text-3xl mb-2">Painel de Avisos</h1>
        <div className="flex flex-col p-2 gap-3">
          {advices.map((advice) => (
            <Dialog key={advice.id}>
              <DialogTrigger asChild>
                <article
                  key={advice.id}
                  className="border-[1px] border-gray-400/50 border-solid rounded-3xl p-4 text-start"
                >
                  <div className="flex items-center justify-between gap-4">
                    <img src={Advice} />
                    <div className="text-sm text-gray-800 flex flex-col w-full">
                      <span className="font-bold text-gray-800 text-md">
                        {advice.titulo}
                      </span>
                      <p className="text-sm line-clamp-2">{advice.descricao}</p>
                    </div>
                  </div>
                </article>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Editar Aviso</DialogTitle>
                  <DialogDescription>
                    Altere as informações deste aviso, caso não queira alterar apenas não preencha o campo.
                  </DialogDescription>
                </DialogHeader>
                <form
                  onSubmit={(event) => alterarAviso(event, advice.id)}
                  className="grid gap-4 py-4"
                >
                  <InputLabel
                    label="Título"
                    placehoder={ "Atual: " + advice.titulo }
                    name="titulo"
                    required
                    type="text"
                  />
                  <fieldset className="grid w-full max-w-sm items-center justify-items-start gap-1.5">
                    <Label>Descrição</Label>
                    <Textarea name="descricao" placeholder={ "Atual: " + advice.descricao }>
                    
                    </Textarea>
                  </fieldset>

                  <DialogFooter>
                    <Button type="submit">Alterar</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          ))}
        </div>
        <button
          onClick={() => navigate("/advices-register")}
          className="bg-[#0A1576] rounded-full w-fit p-3 absolute bottom-3 right-3"
        >
          <Plus color="white" width={18} height={18} strokeWidth={3} />
        </button>
      </div>
    </>
  );
};
export default Advices;
