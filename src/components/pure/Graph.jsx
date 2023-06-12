import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const Graph = ({ expenses }) => {
  const [expensesData, setExpensesData] = useState({
    labels: expenses.map((expense) => expense.description),
    datasets: [
      {
        label: "$ pesos gastados",
        data: expenses.map((exp) => exp.amount),
      },
    ],
  });
  return (
    <div className="chart-container">
      <Pie data={expensesData}></Pie>
    </div>
  );
};

export default Graph;
