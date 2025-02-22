import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { selectBudget } from "./features/budgetSlice";
import { useSelector } from "react-redux";

ChartJS.register(ArcElement, Tooltip, Legend);

const labels = ["Budget", "Spent"];

function Widgets() {
  const budgetState = useSelector(selectBudget);
  const [chartData, setChartData] = useState([0, 0, 0, 0]);

  useEffect(() => {
    setChartData([budgetState.totalBudget, budgetState.totalSpent]);
  }, [budgetState, chartData]);

  const data = {
    labels,
    datasets: [
      {
        data: chartData,
        backgroundColor: ["rgba(255, 99, 132, 0.6)", "rgba(54, 162, 235, 0.6)"],
        borderColor: ["rgba(0, 0, 0, 0)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200 w-full max-w-xs mx-auto">
      <div className="w-60 h-60 mx-auto mb-10">
        <Doughnut data={data} className="px" />
        <p className="text-lg font-semibold text-gray-800 ml-[60px] pt-2">
          {(budgetState.totalSpent / budgetState.totalBudget) * 100}% Spent
        </p>
      </div>
    </div>
  );
}

export default Widgets;
