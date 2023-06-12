import React, { useEffect, useState } from "react";
import "./ExpensesPage.css";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { app } from "../../firebase/fibaseConfig";
import { CircularProgress } from "@mui/material";
import FormAddExpense from "../pure/FormAddExpense";
import Graph from "../pure/Graph";

const ExpensesPage = () => {
  const [monthRequested, setMonthRequested] = useState({
    month: 1,
    year: 2023,
  });
  const [expenses, setExpenses] = useState([]);
  const [selectedExpenses, setSelectedExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [monthExpensesLength, setMonthExpensesLength] = useState(0);
  const auth = getAuth();
  const uid = auth.currentUser.uid;
  const db = getFirestore(app);

  useEffect(() => {
    const fetchData = async () => {
      await fetchUserExpenses();
      setIsInitialRender(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    setMonthExpensesLength(0);
    if (!isInitialRender) {
      updateInformation();
      setIsLoading(false);
    }
  }, [expenses]);

  useEffect(() => {
    setMonthExpensesLength(0);
    updateInformation();
  }, [monthRequested]);

  useEffect(() => {
    setMonthExpensesLength(selectedExpenses.length);
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
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (input, value) => {
    setIsLoading(true);
    setMonthRequested({ ...monthRequested, [input]: value.target.value });
    setIsLoading(false);
  };

  const updateInformation = () => {
    if (
      expenses[monthRequested.year] !== undefined &&
      expenses[monthRequested.year][monthRequested.month] !== undefined
    ) {
      setSelectedExpenses([
        ...expenses[monthRequested.year][monthRequested.month],
      ]);
    } else {
      setSelectedExpenses([]);
    }
  };

  const handleAddExpense = async () => {
    await fetchUserExpenses();
  };

  if (isLoading) {
    return (
      <div className="spinner-container">
        <CircularProgress size={60}></CircularProgress>
      </div>
    );
  }

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
      </div>
      <div className="expenses-container">
        {monthExpensesLength <= 0 ? (
          <p className="no-graph-text">
            No hay gastos para el mes seleccionado
          </p>
        ) : (
          <Graph expenses={selectedExpenses} />
        )}
        <div className="form-add-main-container">
          <FormAddExpense
            monthYear={monthRequested}
            userUID={uid}
            expensesSelected={selectedExpenses}
            updateExpenseLocal={handleAddExpense}
          />
        </div>
      </div>
    </div>
  );
};

export default ExpensesPage;
