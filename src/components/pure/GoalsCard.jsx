import React from "react";
import "./GoalsCard.scss";
import goalsIcon from "../../assets/images/goals.png";
import blobGoal from "../../assets/images/blob-goal.png";

const GoalsCard = ({ goals }) => {
  return (
    <div className="main-goals-container">
      <div className="goals-card">
        <div className="goal-img-container">
          <img className="blob" src={blobGoal} alt="blob"></img>
          <img src={goalsIcon} alt="goal" className="goals-icon"></img>
        </div>
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
