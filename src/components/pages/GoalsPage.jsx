import React, { useState } from "react";
import FormAddGoal from "../pure/FormAddGoal";
import "./GoalsPage.css";

const GoalsPage = () => {
  const [creationFormOpen, setCreationFormOpen] = useState(true);
  return (
    <div>
      <div className="goal-creation-container">
        <button
          className="goal-form-toggle"
          onClick={() => setCreationFormOpen(!creationFormOpen)}
        >
          Crear objetivo
        </button>
        {creationFormOpen ? <FormAddGoal /> : null}
      </div>
    </div>
  );
};

export default GoalsPage;
