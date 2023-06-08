import React, { useState } from "react";
import "./ExpensesPage.css";
import { getAuth } from "firebase/auth";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { app } from "../../firebase/fibaseConfig";
import { CircularProgress } from "@mui/material";

const ExpensesPage = () => {
  const [monthRequested, setMonthRequested] = useState({
    month: "Enero",
    year: 2015,
  });
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const auth = getAuth();
  const uid = auth.currentUser.uid;
  const db = getFirestore(app);

  const fetchUserExpenses = async () => {
    const docRef = collection(db, "expenses");
    const queryString = query(docRef, where("userUID", "==", uid));
    const expensesSnapshot = await getDocs(queryString);
    setExpenses(expensesSnapshot);
  };

  const handleChange = (input, value) => {
    setMonthRequested({ ...monthRequested, [input]: value.target.value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    await fetchUserExpenses();
    setIsLoading(false);
  };

  return (
    <div className="expense-page-container">
      <div className="selection-container">
        <div className="month-selection">
          <label>Elige el mes</label>
          <select
            onChange={(e) => handleChange("month", e)}
            className="select-month"
          >
            <option value={"Enero"}>Enero</option>
            <option value={"Febrero"}>Febrero</option>
            <option value={"Marzo"}>Marzo</option>
            <option value={"Abril"}>Abril</option>
            <option value={"Mayo"}>Mayo</option>
            <option value={"Junio"}>Junio</option>
            <option value={"Julio"}>Julio</option>
            <option value={"Agosto"}>Agosto</option>
            <option value={"Septiembre"}>Septiembre</option>
            <option value={"Octubre"}>Octubre</option>
            <option value={"Noviembre"}>Noviembre</option>
            <option value={"Diciembre"}>Diciembre</option>
          </select>
        </div>
        <div className="year-selection">
          <label>Elige el año</label>
          <input
            type="number"
            value={monthRequested.year}
            onChange={(e) => handleChange("year", e)}
            min={0}
            max={3000}
          />
        </div>
        <div className="search-btn-container">
          <button className="search-btn" onClick={handleSubmit}>
            {isLoading ? <CircularProgress size={20} /> : "Buscar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpensesPage;
