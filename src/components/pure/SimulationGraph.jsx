import React, { useEffect, useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Doughnut, Bar, Pie, Radar, Line, PolarArea } from "react-chartjs-2";

const SimulationGraph = ({ simulationProp }) => {
  const [simulationData, setSimulationData] = useState({
    labels: simulationProp.expenses.map((expense) => expense.name),
    datasets: [
      {
        label: "$ pesos gastados",
        data: simulationProp.expenses.map((exp) => exp.amount),
      },
    ],
  });
  const [graphStyles, setGraphStyles] = useState([
    Doughnut,
    Bar,
    Pie,
    Radar,
    Line,
    PolarArea,
  ]);

  const [currentGraph, setCurrentGraph] = useState(0);

  const handleChangeGraph = (number) => {
    if (currentGraph + number >= graphStyles.length) {
      setCurrentGraph(0);
    } else if (currentGraph + number < 0) {
      setCurrentGraph(graphStyles.length - 1);
    } else {
      setCurrentGraph((prev) => prev + number);
    }
  };

  return (
    <div>
      {simulationProp.expenses ? (
        <React.Fragment>
          <div className="button-container">
            <button onClick={() => handleChangeGraph(-1)}>
              <ArrowBackIosNewIcon />
            </button>
            <button>
              <ArrowForwardIosIcon onClick={() => handleChangeGraph(1)} />
            </button>
          </div>
          {React.createElement(graphStyles[currentGraph], {
            data: simulationData,
          })}
        </React.Fragment>
      ) : (
        <p>Cargando datos...</p>
      )}
    </div>
  );
};

export default SimulationGraph;
