import { Button } from "@/components/ui/button";
import { InputLabel } from "../components/internals/fieldSets/inputLabel";
import { InputLabelPassword } from "@/components/internals/fieldSets/inputLabelPassword";
import { CheckboxLabel } from "@/components/internals/fieldSets/checkboxLabel";
import { Link } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import axios from "axios";

const SignUp = () => {
  async function Cadastrar(event: React.FormEvent<HTMLFormElement>) {
    event?.preventDefault();

    const nome = event.currentTarget.nome.value;
    const email = event.currentTarget.email.value;
    const telefone = event.currentTarget.telefone.value;
    const senha = event.currentTarget.senha.value;

    try {
      await axios.post("http://localhost:3000/Usuario/", {
        nome: nome,
        email: email,
        telefone: telefone,
        senha: senha
      })
      .then((res) => {
        toast.success("Cadastro realizado com Sucesso, Seja Bem-vindo!", {
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
          location.href = "/";
        }, 3000);

      }).catch(() => {
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
    } catch (error)
    {
      toast.error("Credenciais Inválidas", {
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
      <section className="h-full w-full grid place-items-center">
        <div className="grid min-w-[300px] max-w-full mb-6 gap-1">
          <h1 className="text-[26px] text-center text-[#1B59F8] font-extrabold">
            Crie uma nova conta!
          </h1>
          <p className="text-[#667085] text-center text-[12px] text-wrap max-w-[300px]">
            Preencha as informações para criar sua conta.
          </p>
        </div>

        <form onSubmit={Cadastrar} className="grid gap-5 min-w-[300px] max-w-full">
          <InputLabel
            label="Nome"
            type="text"
            name="nome"
            placehoder="John Doe"
            required
          />
          <InputLabel
            label="Telefone"
            type="tel"
            name="telefone"
            placehoder="11 9393930930"
            required
          />
          <InputLabel
            label="Email"
            type="email"
            name="email"
            placehoder="Ex: antonio@email.com"
            required
          />

          <InputLabelPassword label="Senha" name="senha" placehoder="" />
          <div className="w-full flex justify-between items-center">
            <CheckboxLabel required text="Eu concordo com os" boldText="Termos e Condições" name="terms" />
          </div>
          <Button type="submit" variant={"default"}>
            Entrar
          </Button>
          <Link
            to="/"
            className="text-sm text-[#344054] font-normal hover:text-[#0A1576] hover:underline"
          >
            Já tem uma conta?
            <span className="text-[#0A1576] font-medium ml-1">Entrar</span>
          </Link>
        </form>
      </section>
    </>
  );
};
export default SignUp;
