import { Plus } from "lucide-react";
import Advice from "@/assets/advice.svg"
import { useNavigate } from "react-router-dom";

const Advices = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="h-dvh overflow-auto w-full pl-[80px] pt-[3%] pr-[3%] flex flex-col justify-items-end text-end">
        <h1 className="font-bold text-3xl mb-2">Painel de Avisos</h1>
        <div className="flex flex-col p-2 gap-3">
        <article className="border-[1px] border-gray-400/50 border-solid rounded-3xl p-4 text-start">
            <div className="flex items-center justify-between gap-4">
              <img 
               src={Advice}
              />
              <div className="text-sm text-gray-800 flex flex-col w-full">
                <span className="font-bold text-gray-800 text-md">
                Reunião - dia 18/12
                </span>
                <p className='text-sm line-clamp-2'>
                Reunião sobre o próximo mutirão semestral 
                </p>
              </div>
            </div>
          </article>
        </div>
        <button onClick={() => navigate("/advices-register")} className="bg-[#0A1576] rounded-full w-fit p-3 absolute bottom-3 right-3">
          <Plus color="white" width={18} height={18} strokeWidth={3} />
        </button>
      </div>
    </>
  );
};
export default Advices;
