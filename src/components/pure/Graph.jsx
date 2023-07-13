import React, { useState } from "react";
import { Chart, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import "./Graph.scss";

export const colorGraph = [
  "#bee9e8",
  "#62b6cb",
  "#1b4965",
  "#cae9ff",
  "#5fa8d3",
  "#4361ee",
  "#4cc9f0",
  "#3a0ca3",
  "#b5179e",
];

const Graph = ({ expenses }) => {
  const [expensesData, setExpensesData] = useState({
    labels: expenses.map((expense) => expense.description),
    datasets: [
      {
        label: "$ pesos gastados",
        data: expenses.map((exp) => exp.amount),
        backgroundColor: colorGraph,
      },
    ],
  });

  return (
    <div className="chart-container">
      <Doughnut data={expensesData}></Doughnut>
    </div>
  );
};

export default Graph;
