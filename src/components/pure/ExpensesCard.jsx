import React from "react";
import "./ExpensesCard.css";
import walletIcon from "../../assets/images/wallet-icon.png";

const ExpensesCard = ({ expenses }) => {
  return (
    <div className="main-expenses-container">
      {expenses.length > 0 ? (
        <div className="expenses-card"></div>
      ) : (
        <div className="no-expenses-card">
          <img src={walletIcon} alt="wallet" className="wallet-icon"></img>
          <div className="no-expenses-text">
            <h3>No hay gastos registrados</h3>
            <h4>Comienza haciendo click aquí</h4>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpensesCard;
