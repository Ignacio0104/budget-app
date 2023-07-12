import React from "react";
import "./SimulationCard.scss";
import projectionIcon from "../../assets/images/projection.png";
import blobSimulation from "../../assets/images/blob-simulation.png";

const SimulationCard = () => {
  return (
    <div className="main-simulation-container">
      <div className="simulation-card">
        <div className="simulation-img-container">
          <img
            className="blob-simulation"
            src={blobSimulation}
            alt="blob"
          ></img>
          <img
            src={projectionIcon}
            alt="projection"
            className="projection-icon"
          ></img>
        </div>
        <div className="simulation-text">
          <h3>Simulacion</h3>
          <h4>Proyecta y planifica tus próximos meses</h4>
        </div>
      </div>
    </div>
  );
};

export default SimulationCard;
