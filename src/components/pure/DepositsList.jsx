import React, { useState } from "react";
import "./DepositsList.css";
import FormAddDeposit from "./FormAddDeposit";

const DepositsList = ({ deposits, toogleSelected }) => {
  const [showForm, setShowForm] = useState(false);
  const toggleForm = () => {
    setShowForm(!showForm);
  };
  return (
    <div>
      <h2> {deposits ? "Depositos" : "No hay depositos"}</h2>
      <div className="add-deposit">
        <button onClick={toggleForm}>Crear deposito</button>
      </div>
      {showForm ? <FormAddDeposit /> : null}
      <button onClick={() => toogleSelected(null)}>Volver</button>
    </div>
  );
};

export default DepositsList;
