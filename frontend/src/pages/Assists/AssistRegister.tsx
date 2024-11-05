import { InputLabel } from "@/components/internals/fieldSets/inputLabel";
import { ISelectLabel } from "@/components/internals/fieldSets/selectLabel";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";

const AssistRegister = () => {
  const [age, setAge] = useState(0);
  const [date, setDate] = useState("");

  async function RegisterAssists(event: React.FormEvent<HTMLFormElement>) 
  {
    event?.preventDefault();

    const nome = event.currentTarget.nome.value;
    // const apelido = event.currentTarget.apelido.value;apelido
    const dataNascimento = new Date(event.currentTarget.dataNascimento.value).toISOString();
    const sexo = event.currentTarget.sexo.value;
    const estadoCivil = event.currentTarget.estadoCivil.value;
    const familiar = event.currentTarget.familiares.value == "Sim" ? true : false;
    const contato = event.currentTarget.proximidade.value == "Sim" ? true : false;
    const filhos = event.currentTarget.filhos.value == "Sim" ? true : false;
    const descricao = event.currentTarget.local.value;
    const motivo = event.currentTarget.motivo.value;
    const usuarioId = parseInt(sessionStorage.getItem("usuarioId") as string);
    
    try {
      await axios.post("http://localhost:3000/Assistidos/", {
        nome: nome,
        data_nascimento: dataNascimento,
        sexo: sexo,
        situacao: "Na rua",
        estado_civil: estadoCivil,
        familiar_proximo: familiar,
        motivo_saiu: motivo,
        filhos: filhos,
        existe_contato: contato,
        descricao: descricao,
        ativo: true,
        usuarioId: usuarioId
      })
      .then((res) => {

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
          location.href = "/assist-list";
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

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = event.target.value;
    setDate(selectedDate);

    const birthDate = new Date(selectedDate);
    const today = new Date();
    const calculatedAge = today.getFullYear() - birthDate.getFullYear();

    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      setAge(calculatedAge - 1);
    } else {
      setAge(calculatedAge);
      console.log(calculatedAge);
    }
  };
  return (
    <>
          <ToastContainer stacked className="text-start" />
      <div className="h-dvh overflow-auto w-full pl-[80px] pt-[3%] pr-[3%] flex flex-col justify-items-end text-end">
        <h1 className="font-bold text-3xl mb-2">Novo Cadastro</h1>
        <form onSubmit={RegisterAssists} className="flex flex-col p-2 gap-3">
          <InputLabel
            label="Nome Completo"
            type="text"
            name="nome"
            placehoder="Ex: José Maria"
            required
          />
          {/* <InputLabel
            label="Apelido"
            type="text"
            name="apelido"
            placehoder="Ex: Seu Zé"
            required
          /> */}
          <div className="flex gap-3">
            <InputLabel
              label="Idade"
              type="number"
              name="idade"
              value={`${age} anos`}
              readonly
              placehoder={`${age} anos`}
              required
            />
            <InputLabel
              label="Data de Nascimento"
              type="date"
              name="dataNascimento"
              value={date}
              onChange={handleDateChange}
              required
            />
          </div>
          <ISelectLabel
            label="Estado Civil"
            name="estadoCivil"
            placehoder="Ex: Solteiro"
            className="custom-select-class"
            value="Estado Civil"
            // onChange={handleSelectChange}
            required={true}
            readonly={false}
            childs={[
              { text: "Solteiro", value: "Solteiro" },
              { text: "Casado", value: "Casado" },
              { text: "Divorciado", value: "Divorciado" }
            ]}
          />
          <ISelectLabel
            label="Sexo"
            name="sexo"
            placehoder="Ex: Masculino"
            className="custom-select-class"
            value="Sexo"
            // onChange={handleSelectChange}
            required={true}
            readonly={false}
            childs={[
              { text: "Masculino", value: "Masculino" },
              { text: "Feminino", value: "Feminino" },
              { text: "Outro", value: "Outro" }
            ]}
          />
          <InputLabel
            label="Motivo da Situação"
            type="text"
            name="motivo"
            placehoder="Ex: Mudança de cidade"
            required
          />
          <InputLabel
            label="Local onde fica?"
            type="text"
            name="local"
            placehoder="Ex: Rua X, perto do local y"
            required
          />
         <ISelectLabel
            label="Possui Filhos?"
            name="filhos"
            placehoder="Ex: Sim"
            className="custom-select-class"
            value="Possui Filhos?"
            // onChange={handleSelectChange}
            required={true}
            readonly={false}
            childs={[
              { text: "Sim", value: "Sim" },
              { text: "Não", value: "Não" }
            ]}
          />
         <ISelectLabel
            label="Possui Familiares?"
            name="familiares"
            placehoder="Ex: Sim"
            className="custom-select-class"
            value="Possui Familiares?"
            // onChange={handleSelectChange}
            required={true}
            readonly={false}
            childs={[
              { text: "Sim", value: "Sim" },
              { text: "Não", value: "Não" }
            ]}
          />
          <ISelectLabel
            label="Moram próximos?"
            name="proximidade"
            placehoder="Ex: Sim"
            className="custom-select-class"
            value="Moram próimos?"
            // onChange={handleSelectChange}
            required={true}
            readonly={false}
            childs={[
              { text: "Sim", value: "Sim" },
              { text: "Não", value: "Não" }
            ]}
          />
          <Button type="submit" className="p-6 rounded-xl">Salvar</Button>
        </form>
      </div>
    </>
  );
};
export default AssistRegister;
