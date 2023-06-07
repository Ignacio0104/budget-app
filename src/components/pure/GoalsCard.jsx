import React from "react";
import "./GoalsCard.css";
import goalsIcon from "../../assets/images/goals.png";

const GoalsCard = ({ goals }) => {
  return (
    <div className="main-goals-container">
      {goals.length > 0 ? (
        <div className="goals-card"></div>
      ) : (
        <div className="no-goals-card">
          <img src={goalsIcon} alt="goals" className="goals-icon"></img>
          <div className="no-goals-text">
            <h3>No hay objetivos registrados</h3>
            <h4>Comienza haciendo click aquí</h4>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoalsCard;
