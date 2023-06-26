import React, { useEffect, useState } from "react";
import "./DepositsList.css";
import FormAddDeposit from "./FormAddDeposit";

const DepositsList = ({ goal, toogleSelected, handleUpdate }) => {
  const [showForm, setShowForm] = useState(false);
  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const updateGoal = async (deposit) => {
    let newGoal = {
      [goal.key]: {
        ...goal,
        deposits: goal.deposits ? [...goal.deposits, deposit] : [deposit],
      },
    };
    await handleUpdate(newGoal);
  };

  return (
    <div>
      <h2>
        {goal.deposits
          ? goal.deposits.map((goal) => <p>${goal.amount}</p>)
          : "No hay depositos"}
      </h2>
      <div className="add-deposit">
        <button onClick={toggleForm}>
          {showForm ? "Cerrar" : "Crear Deposito"}
        </button>
      </div>
      {showForm ? <FormAddDeposit handleUpdate={updateGoal} /> : null}
      <button onClick={() => toogleSelected(null)}>Volver</button>
    </div>
  );
};

export default DepositsList;
