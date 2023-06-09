import React, { useEffect, useState } from "react";
import "./ExpensesPage.css";
import { getAuth } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { app } from "../../firebase/fibaseConfig";
import { CircularProgress } from "@mui/material";
import FormAddExpense from "../pure/FormAddExpense";

const ExpensesPage = () => {
  const [monthRequested, setMonthRequested] = useState({
    month: 1,
    year: 2015,
  });
  const [expenses, setExpenses] = useState([]);
  const [selectedExpenses, setSelectedExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchSubmitted, setSearchSubmitted] = useState(false);
  const auth = getAuth();
  const uid = auth.currentUser.uid;
  const db = getFirestore(app);

  useEffect(() => {
    fetchUserExpenses();
  }, []);

  useEffect(() => {
    console.log(selectedExpenses);
  }, [selectedExpenses]);

  const fetchUserExpenses = async () => {
    const docRef = doc(db, "expenses", uid);
    const docSnap = await getDoc(docRef);
    docSnap.data();
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        let data = docSnap.data();
        setExpenses(data);
      } else {
        console.log("Document does not exist");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (input, value) => {
    setSearchSubmitted(false);
    setMonthRequested({ ...monthRequested, [input]: value.target.value });
  };

  const handleSubmit = () => {
    setSearchSubmitted(false);
    setSelectedExpenses(expenses[monthRequested.year][monthRequested.month]);

    setSearchSubmitted(true);
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
            <option value={1}>Enero</option>
            <option value={2}>Febrero</option>
            <option value={3}>Marzo</option>
            <option value={4}>Abril</option>
            <option value={5}>Mayo</option>
            <option value={6}>Junio</option>
            <option value={7}>Julio</option>
            <option value={8}>Agosto</option>
            <option value={9}>Septiembre</option>
            <option value={10}>Octubre</option>
            <option value={11}>Noviembre</option>
            <option value={12}>Diciembre</option>
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
      {searchSubmitted ? (
        <div className="expenses-container">
          {expenses.length <= 0
            ? "No hay gastos para el mes seleccionado"
            : "Hay gastos"}
          <div className="form-add-main-container">
            <FormAddExpense
              monthYear={monthRequested}
              userUID={uid}
              expensesSelected={selectedExpenses}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ExpensesPage;
