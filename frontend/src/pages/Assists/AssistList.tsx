import { IconButton } from "@/components/internals/buttons/iconButton";
import Filter from "@/assets/filter.svg";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
const AssistList = () => {
  const navigate = useNavigate();
  return (
    <>
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

          <article className="border-[1px] border-gray-400/50 border-solid rounded-3xl p-4 text-start">
            <span className="font-bold text-gray-800">
              Luiz Fernando Pereira
            </span>
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-800">
                <b>Data de nascimento:</b>
                <p>20/12/2003</p>
                <p>
                  <b>Situação:</b> Na rua
                </p>
              </div>
              <span className="text-center font-semibold text-gray-800">
                25
                <br />
                Anos
              </span>
            </div>
          </article>
        </div>
      </div>
    </>
  );
};

export default AssistList;
