import React from "react";
import "./SimulationCard.css";
import projectionIcon from "../../assets/images/projection.png";

const SimulationCard = () => {
  return (
    <div className="main-simulation-container">
      <div className="simulation-card">
        <img
          src={projectionIcon}
          alt="projection"
          className="projection-icon"
        ></img>
        <div className="simulation-text">
          <h3>Simulacion</h3>
          <h4>Proyecta y planifica tus próximos meses</h4>
        </div>
      </div>
    </div>
  );
};

export default SimulationCard;
