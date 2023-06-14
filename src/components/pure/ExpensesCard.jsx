import React from "react";
import "./ExpensesCard.css";
import walletIcon from "../../assets/images/graph-icon.png";

const ExpensesCard = ({ expenses }) => {
  return (
    <div className="main-expenses-container">
      <div className="expenses-card">
        <img src={walletIcon} alt="wallet" className="wallet-icon"></img>
        <div className="expenses-text">
          <h3>
            {expenses ? "Tus gatos mensuales" : "No hay gastos registrados"}
          </h3>
          <h4>
            {expenses ? "Ingresa desde aquí" : "Comienza haciendo click aquí"}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default ExpensesCard;
