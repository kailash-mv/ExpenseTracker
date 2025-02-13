import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";
import { selectBudget } from "./features/budgetSlice";
import { useSelector } from "react-redux";

ChartJS.register(ArcElement, Tooltip, Legend);

const API_URL = "https://expensetracker-backend-mn1g.onrender.com";
const labels = ["Miscellaneous", "Food", "Medicine", "Dress"];

function Widgets() {
  const budgetState = useSelector(selectBudget);
  const [chartData, setChartData] = useState([0, 0, 0, 0]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get(`${API_URL}/data`);
        const fetchedData = response.data;
        fetchedData["Food"] = -fetchedData["Food"];
        fetchedData["Medicine"] = -fetchedData["Medicine"];
        fetchedData["Dress"] = -fetchedData["Dress"];
        if (
          fetchedData["Food"] +
            fetchedData["Medicine"] +
            fetchedData["Dress"] ===
          budgetState.totalSpent
        ) {
          fetchedData["Miscellaneous"] = 0;
        } else {
          fetchedData["Miscellaneous"] =
            budgetState.totalSpent -
            (fetchedData["Food"] +
              fetchedData["Medicine"] +
              fetchedData["Dress"]);
        }

        const updatedData = labels.map((label) => fetchedData[label] || 0);
        setChartData(updatedData);
      } catch (error) {
        console.error("Unable to fetch chart data:", error);
      }
    };

    fetchChartData();
  }, [budgetState, chartData]);

  const data = {
    labels,
    datasets: [
      {
        data: chartData,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1.5,
      },
    ],
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200 w-full max-w-xs mx-auto">
      <h2 className="text-lg font-semibold text-gray-800 text-center mb-4">
        Expense Distribution
      </h2>
      <div className="w-60 h-60 mx-auto">
        <Doughnut data={data} />
      </div>
    </div>
  );
}

export default Widgets;
