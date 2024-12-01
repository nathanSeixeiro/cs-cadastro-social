import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJs, Tooltip, Legend, ArcElement } from "chart.js";

ChartJs.register(Tooltip, Legend, ArcElement);

const DoughnutGraph = () => {

  const data = {
    labels: ["62% Na rua", "13% Em recuperação", "23% Recuperados"],
    datasets: [
      {
        // label: "My First Dataset",
        data: [300, 50, 100],
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
