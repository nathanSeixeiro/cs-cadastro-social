import { IconButton } from "@/components/internals/buttons/iconButton";
import DoughnutGraph from "@/components/internals/charts/pieChart";
import { Button } from "@/components/ui/button";
import Calendar from "@/assets/calendar.svg";
import { useNavigate } from "react-router-dom";
import { Assistido } from "./Assists/AssistList";
import { useEffect, useState } from "react";
import axios from "axios";
// import AddToHomeScreen from "@/components/ui/AddToHomeScreen";
const Home = () => {
  const navigate = useNavigate();
  const [assistidos, setAssistidos] = useState<Assistido[]>([]);

  useEffect(() => {
    const buscarAssistidos = async () => {
      try {
        const response = await axios.get("http://localhost:3000/Assistidos/");

      } catch (error) {

      }
    };
    }, []);

  return (
    <>
      {/* <AddToHomeScreen /> */}
      <section className="h-dvh overflow-auto w-full pl-[80px] pt-[3%] pr-[3%] grid justify-items-end  grid-rows-[85px_auto]">
        <h1 className="font-bold text-3xl mb-2">Dashboard</h1>
        <div className="min-w-[90%] flex flex-col gap-2 ">
          <article className="h-fit border-solid border-[#EFF0F6] border-[2px] p-6 flex gap-3 rounded-3xl justify-between">
            <p className="font-semibold text-xl text-[rgb(77,77,77)]">
              Assistidos
            </p>
            <span className="font-semibold text-xl text-gray-950">76</span>
          </article>
          <div className="flex w-full justify-between gap-2">
            <article className="w-full border-solid border-[#EFF0F6] border-[2px] p-4 grid gap-3 rounded-2xl text-center">
              <p className="font-semibold text-[#4D4D4D]">Homens</p>
              <span className="font-semibold text-xl text-gray-950">38</span>
            </article>
            <article className="w-full border-solid border-[#EFF0F6] border-[2px] p-4 grid gap-3 rounded-2xl  text-center">
              <p className="font-semibold font text-[#4D4D4D]">Mulheres</p>
              <span className="font-semibold text-xl text-gray-950">38</span>
            </article>
          </div>
          <article className="border-solid h-[260px] border-[#EFF0F6] border-[2px] p-4 grid  rounded-2xl">
            <div className="grid justify-items-start">
              <p className="font-semibold font text-[#4D4D4D]">
                Situação Geral
              </p>
              <span className="font-semibold text-gray-950">76</span>
            </div>
            <div className="w-[190px] h-[190px] pb-2">
              <DoughnutGraph />
            </div>
          </article>
          <IconButton className="p-6 rounded-xl" text="Aniversariante do Mês" onClick={() => navigate("/birthdays-list")} icon={Calendar} />
          <Button className="p-6 rounded-xl" onClick={() => navigate("/assist-register")}>Novo Cadastro</Button>
        </div>
      </section>
    </>
  );
};
export default Home;
