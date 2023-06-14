import React from "react";
import "./GoalsCard.css";
import goalsIcon from "../../assets/images/goals.png";

const GoalsCard = ({ goals }) => {
  return (
    <div className="main-goals-container">
      <div className="goals-card">
        <img src={goalsIcon} alt="goals" className="goals-icon"></img>
        <div className="goals-text">
          <h3>{goals ? "Tus objetivos" : "No hay objetivos registrados"}</h3>
          <h4>
            {goals ? "Ingresa desde aquí" : "Comienza haciendo click aquí"}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default GoalsCard;
