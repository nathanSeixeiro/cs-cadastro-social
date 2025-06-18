import reactLogo from "@/assets/react.svg";
import { Button } from "@/components/ui/button";
import { InputLabel } from "../components/internals/fieldSets/inputLabel";
import { Link, useParams } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import axios from "axios";

const ForgotPassword = () => {
  const { id } = useParams(); // Captura o ID da rota, se existir

  // Função para enviar o email de recuperação
  async function handlePasswordRecovery(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event?.preventDefault();

    const email = event.currentTarget.email.value;

    try {
      await axios.post("https://api-cs.software/forgot-password", { email });
      toast.success("E-mail de recuperação enviado com sucesso!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
    } catch (error) {
      toast.error("Erro ao enviar o e-mail de recuperação.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
    }
  }

  // Função para redefinir a senha
  async function handleResetPassword(event: React.FormEvent<HTMLFormElement>) {
    event?.preventDefault();

    const password = event.currentTarget.password.value;
    const confirmPassword = event.currentTarget.confirmPassword.value;

    if (password !== confirmPassword) {
      toast.error("As senhas não conferem.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    try {
      await axios.post(`https://api-cs.software/forgot-password/${id}`, {
        password,
      });
      toast.success("Senha redefinida com sucesso!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
      setTimeout(() => {
        location.href = "/";
      }, 3000);
    } catch (error) {
      toast.error("Erro ao redefinir a senha.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
    }
  }

  if (id) {
    // Tela para redefinição de senha quando o ID está presente
    return (
      <>
        <ToastContainer stacked className="text-start" />
        <section className="h-full w-full grid place-items-center">
          <div className="w-full grid justify-items-center gap-7">
            <img src={reactLogo} className="logo react" alt="React logo" />
            <div className="text-start grid justify-center w-full mb-8">
              <h1 className="text-[26px] text-[#344054] font-extrabold">
                Redefinir Senha
              </h1>
              <small className="text-[#667085] text-[12px]">
                Digite sua nova senha.
              </small>
            </div>
          </div>
          <form
            onSubmit={handleResetPassword}
            className="grid gap-5 min-w-[300px] max-w-full"
          >
            <InputLabel
              label="Nova Senha"
              type="password"
              name="password"
              placehoder="Digite sua nova senha"
              required
            />
            <InputLabel
              label="Confirmar Senha"
              type="password"
              name="confirmPassword"
              placehoder="Confirme sua nova senha"
              required
            />
            <Button type="submit" variant={"default"}>
              Redefinir Senha
            </Button>
          </form>
        </section>
      </>
    );
  }

  // Tela padrão para recuperação de senha
  return (
    <>
      <ToastContainer stacked className="text-start" />
      <section className="h-full w-full grid place-items-center">
        <div className="w-full grid justify-items-center gap-7">
          <img src={reactLogo} className="logo react" alt="React logo" />
          <div className="text-start grid justify-center w-full mb-8">
            <h1 className="text-[26px] text-[#344054] font-extrabold">
              Esqueci a Senha
            </h1>
            <small className="text-[#667085] text-[12px]">
              Digite seu email para receber o link de recuperação.
            </small>
          </div>
        </div>
        <form
          onSubmit={handlePasswordRecovery}
          className="grid gap-5 min-w-[300px] max-w-full"
        >
          <InputLabel
            label="Email"
            type="email"
            name="email"
            placehoder="Ex: antonio@email.com"
            required
          />
          <Button type="submit" variant={"default"}>
            Enviar
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

export default ForgotPassword;
