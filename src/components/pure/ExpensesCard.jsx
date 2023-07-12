import React from "react";
import "./ExpensesCard.scss";
import walletIcon from "../../assets/images/graph-icon.png";
import blobExpenses from "../../assets/images/blob-expenses.png";

const ExpensesCard = ({ expenses }) => {
  return (
    <div className="main-expenses-container">
      <div className="expenses-card">
        <div className="expense-img-container">
          <img className="blob" src={blobExpenses} alt="blob"></img>
          <img src={walletIcon} alt="wallet" className="wallet-icon"></img>
        </div>
        <div className="expenses-text">
          <h3>
            {expenses ? "Tus gastos mensuales" : "No hay gastos registrados"}
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
