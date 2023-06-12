import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";
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
      <Doughnut data={expensesData}></Doughnut>
    </div>
  );
};

export default Graph;
