import reactLogo from "@/assets/react.svg";
import googleLogo from "@/assets/google.svg";
import { Button } from "@/components/ui/button";
import { InputLabel } from "../components/internals/fieldSets/inputLabel";
import { InputLabelPassword } from "@/components/internals/fieldSets/inputLabelPassword";
import { CheckboxLabel } from "@/components/internals/fieldSets/checkboxLabel";
import { Link } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import axios from "axios";

const SignIn = () => {
  async function Logar(event: React.FormEvent<HTMLFormElement>) {
    event?.preventDefault();

    const email = event.currentTarget.email.value;
    const senha = event.currentTarget.senha.value;

    try {
      await axios.post("http://localhost:3000/Auth/", {
        email: email,
        senha: senha,
      })
      .then((res) => {
        toast.success("Bem-vindo!", {
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
        sessionStorage.setItem("token", res.data.token)
        sessionStorage.setItem("usuarioId", res.data.usuario.id)
        setTimeout(() => {
          location.href = "/home";
        }, 3000);
      });


    } catch (error) {
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
      <section className=" h-full w-full grid place-items-center">
        <div className="w-full grid justify-items-center gap-7">
          <Link to="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </Link>
          <div className="text-start grid justify-center w-full mb-8">
            <h1 className="text-[26px] text-[#344054] font-extrabold">
              Pastoral da Misercórdia
            </h1>
            <small className="text-[#667085] text-[12px]">
              Preencha todas as informações para acessar.
            </small>
          </div>
        </div>
        <form onSubmit={Logar} className="grid gap-5 min-w-[300px] max-w-full">

          <InputLabel
            label="Email"
            type="email"
            name="email"
            placehoder="Ex: antonio@email.com"
            required
          />

          <InputLabelPassword
          label="Senha"
          name="senha"
          placehoder="" />
          <div className="w-full flex justify-between items-center">
            <CheckboxLabel text="Lembrar de mim" name="terms" />

            <Link
              className="text-[14px] font-semibold text-[#0A1576]"
              to="/esqueci-a-senha"
            >
              Esqueci a senha
            </Link>
          </div>
          <Button type="submit" variant={"default"}>
            Entrar
          </Button>
          <Button type="submit" variant={"outline"}>
            <img className="mr-2" src={googleLogo} />
            Entrar com o Google
          </Button>
          <Link
            to="/signup"
            className="text-sm text-[#344054] font-normal hover:text-[#0A1576] hover:underline"
          >
            Ainda não tem conta?
            <span className="text-[#0A1576] ml-1 font-medium">Inscreva-se</span>
          </Link>
        </form>
      </section>
    </>
  );
};
export default SignIn;
