import { InputLabel } from "@/components/internals/fieldSets/inputLabel";
import { ISelectLabel } from "@/components/internals/fieldSets/selectLabel";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const AssistRegister = () => {
  const [age, setAge] = useState(0);
  const [date, setDate] = useState("");

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
      <div className="h-dvh overflow-auto w-full pl-[80px] pt-[3%] pr-[3%] flex flex-col justify-items-end text-end">
        <h1 className="font-bold text-3xl mb-2">Novo Cadastro</h1>
        <div className="flex flex-col p-2 gap-3">
          <InputLabel
            label="Nome Completo"
            type="text"
            name="nome"
            placehoder="Ex: José Maria"
            required
          />
          <InputLabel
            label="Apelido"
            type="text"
            name="apelido"
            placehoder="Ex: Seu Zé"
            required
          />
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
            label="Sexo"
            name="sexo"
            placehoder="Ex: Masculino"
            className="custom-select-class"
            value="Sexo"
            // onChange={handleSelectChange}
            required={true}
            readonly={false}
            childs={[
              { text: "Masculino", value: "M" },
              { text: "Feminino", value: "F" },
              { text: "Outro", value: "O" },
            ]}
          />
          <InputLabel
            label="Local onde fica?"
            type="text"
            name="local"
            placehoder="Ex: Rua X, perto do local y"
            required
          />
          <InputLabel
            label="Possui familiares?"
            type="text"
            name="familiares"
            placehoder="Ex: Sim"
            required
          />
          <InputLabel
            label="Moram próximos?"
            type="text"
            name="apelido"
            placehoder="Ex: Sim"
            required
          />
          <Button className="p-6 rounded-xl">Salvar</Button>
        </div>
      </div>
    </>
  );
};
export default AssistRegister;
