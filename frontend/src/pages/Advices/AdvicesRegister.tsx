import { InputLabel } from "@/components/internals/fieldSets/inputLabel";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const AdvicesRegister = () => {
  return (
    <>
      <div className="h-dvh overflow-auto w-full pl-[80px] pt-[3%] pr-[3%] flex flex-col justify-items-end text-end">
        <h1 className="font-bold text-2xl mb-2">Criar novo aviso</h1>
        <div className="flex flex-col p-2 gap-3">
          <InputLabel
            label="Título"
            placehoder="Ex: Reunião - 18/10"
            name="titulo"
            required
            type="text"
          />
          <fieldset className="grid w-full max-w-sm items-center justify-items-start gap-1.5">
            <Label>Descrição</Label>
            <Textarea placeholder=""></Textarea>
          </fieldset>
          <Button className="p-6 rounded-xl ">Salvar Aviso</Button>

        </div>

      </div>
    </>
  );
};
export default AdvicesRegister;
