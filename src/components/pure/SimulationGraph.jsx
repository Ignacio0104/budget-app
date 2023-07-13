import React, { useState } from "react";
import WestIcon from "@mui/icons-material/West";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Doughnut, Bar, Pie, Radar, Line, PolarArea } from "react-chartjs-2";
import { colorGraph } from "./Graph";
import "./SimulationGraph.scss";

const SimulationGraph = ({ simulationProp }) => {
  const [simulationData, setSimulationData] = useState({
    labels: simulationProp.expenses.map((expense) => expense.name),
    datasets: [
      {
        label: "$ pesos gastados",
        data: simulationProp.expenses.map((exp) => exp.amount),
        backgroundColor: colorGraph,
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

  const typeOfGraph = () => {
    switch (currentGraph) {
      case 0:
        return "de Rosca";
      case 1:
        return "de Barras";
      case 2:
        return "Circular";
      case 3:
        return "de Radar";
      case 4:
        return "de Líneas";
      case 5:
        return "Polar";
      default:
        return "";
    }
  };

  return (
    <div>
      {simulationProp.expenses ? (
        <React.Fragment>
          <div className="button-container">
            <button onClick={() => handleChangeGraph(-1)}>
              <WestIcon fontSize="large" />
            </button>
            <h4>Gráfico {typeOfGraph()}</h4>
            <button>
              <ArrowForwardIcon
                fontSize="large"
                onClick={() => handleChangeGraph(1)}
              />
            </button>
          </div>
          <div className="chart-container">
            {React.createElement(graphStyles[currentGraph], {
              data: simulationData,
            })}
          </div>
        </React.Fragment>
      ) : (
        <p>Cargando datos...</p>
      )}
    </div>
  );
};

export default SimulationGraph;
