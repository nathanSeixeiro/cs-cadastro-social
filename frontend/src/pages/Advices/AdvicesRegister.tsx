import { InputLabel } from "@/components/internals/fieldSets/inputLabel";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { Bounce, toast, ToastContainer } from "react-toastify";

const AdvicesRegister = () => {
  async function criarAviso(event: React.FormEvent<HTMLFormElement>) {
    event?.preventDefault();

    const token = sessionStorage.getItem("token");
    const titulo = event.currentTarget.titulo.value;
    const descricao = event.currentTarget.descricao.value;

    try {
      axios
        .post(
          "http://localhost:3000/Aviso/",
          {
            titulo: titulo,
            descricao: descricao,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(() => {
          toast.success("Cadastro realizado com Sucesso", {
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
            location.href = "/advices";
          }, 3000);
        })
        .catch(() => {
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
        <h1 className="font-bold text-2xl mb-2">Criar novo aviso</h1>
        <form onSubmit={criarAviso} className="flex flex-col p-2 gap-3">
          <InputLabel
            label="Título"
            placehoder="Ex: Reunião - 18/10"
            name="titulo"
            required
            type="text"
          />
          <fieldset className="grid w-full max-w-sm items-center justify-items-start gap-1.5">
            <Label>Descrição</Label>
            <Textarea name="descricao" placeholder=""></Textarea>
          </fieldset>
          <Button type="submit" className="p-6 rounded-xl ">
            Salvar Aviso
          </Button>
        </form>
      </div>
    </>
  );
};
export default AdvicesRegister;
