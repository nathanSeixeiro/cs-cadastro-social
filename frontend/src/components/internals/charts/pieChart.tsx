import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJs, Tooltip, Legend, ArcElement } from "chart.js";
import { Assistido } from "@/pages/Assists/AssistList";

type ChartAssistidos = {
  assistidos: Assistido[];
}

ChartJs.register(Tooltip, Legend, ArcElement);

const DoughnutGraph = ({assistidos}: ChartAssistidos) => {

  const totalAssistidos = assistidos.length;
  const calculatePercentage = (total: number) => {
    return ((total / totalAssistidos) * 100).toFixed(0);
  }
  const totalNaRua = () => {
    return calculatePercentage(assistidos.filter((assistido: Assistido) => assistido.situacao === "Na rua").length);
  };
  const totalRecuperados = () => {
    return calculatePercentage(assistidos.filter((assistido: Assistido) => assistido.situacao === "Recuperado").length);
  }
  const totalRecuperacao = () => {
    return calculatePercentage(assistidos.filter((assistido: Assistido) => assistido.situacao === "Em recuperação").length);
  }

  const data = {
    labels: [`${totalNaRua()}% Na rua`, `${totalRecuperacao()}% Em recuperação`, `${totalRecuperados()}% Recuperados`],
    datasets: [
      {
        // label: "My First Dataset",
        data: [totalNaRua(), totalRecuperacao(), totalRecuperados()],
        backgroundColor: ["#1B59F8", "#5E8BFF", "#DDDDDD"],
        hoverOffset: 4,
        spacing: 4,
        borderRadius: 6,

        // offset: 8
      },
    ],
  };
  return <Doughnut options={{
    plugins: {
      legend: {
        position: 'top',
        align: 'start'
      }
    },
    responsive: true
  }} data={data} />;
};
export default DoughnutGraph;
