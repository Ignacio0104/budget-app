import React, { useEffect, useState } from "react";
import "./ExpensesPage.scss";
import { CircularProgress } from "@mui/material";
import FormAddExpense from "../pure/FormAddExpense";
import Graph from "../pure/Graph";
import ExpensesList from "../pure/ExpensesList";
import useFirebase from "../../hooks/useFirebase";
import AlertNotification from "../pure/AlertNotification";

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
  const [selectionGraph, setSelectionGraph] = useState("Graph");
  const [snackBarInfo, setSnackBarInfo] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const closeSnackBar = () => {
    setSnackBarInfo({ open: false, message: "", severity: "" });
  };

  const { fetchUserData, uid } = useFirebase();

  useEffect(() => {
    const fetchData = () => {
      fetchUserExpenses();
      setIsInitialRender(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    setMonthExpensesLength(0);
    if (!isInitialRender) {
      updateInformation();
      calculateTotal();
      setIsLoading(false);
    }
  }, [expenses]);

  useEffect(() => {
    rerenderList();
    setMonthExpensesLength(0);
    updateInformation();
  }, [monthRequested]);

  useEffect(() => {
    setMonthExpensesLength(selectedExpenses.length);
  }, [selectedExpenses]);

  const fetchUserExpenses = async () => {
    let res = await fetchUserData("expenses");
    if (res.response === "OK") {
      setExpenses(res.data);
    } else {
      setSnackBarInfo({ open: true, error: res.data, severity: "warning" });
    }
    setIsLoading(false);
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

  const handleChangeExpenses = async () => {
    await fetchUserExpenses();
  };

  const calculateTotal = () => {
    let total = selectedExpenses.reduce(
      (accumulator, current) => accumulator + +current.amount,
      0
    );
    return total;
  };

  const rerenderList = () => {
    if (selectionGraph === "List") {
      setSelectionGraph("Graph");
      setSelectionGraph("List");
    }
  };

  if (isLoading) {
    return (
      <div className="spinner-container">
        <CircularProgress size={60} color="success"></CircularProgress>
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
          <div className="graph-container">
            <div className="graph-list-selector">
              <h4
                className={selectionGraph === "Graph" ? "selected-option" : ""}
                onClick={() => setSelectionGraph("Graph")}
              >
                Graph
              </h4>
              <h4
                className={selectionGraph === "List" ? "selected-option" : ""}
                onClick={() => setSelectionGraph("List")}
              >
                List
              </h4>
            </div>
            {selectionGraph === "Graph" ? (
              <div className="graph-subcontainer">
                <Graph expenses={selectedExpenses} />
                <h3>{`Total: $${calculateTotal()}`}</h3>
              </div>
            ) : (
              <div className="list-container">
                <ExpensesList
                  expenses={selectedExpenses}
                  userUID={uid}
                  monthYear={monthRequested}
                  updateList={handleChangeExpenses}
                />
              </div>
            )}
          </div>
        )}
        <div className="form-add-main-container">
          <FormAddExpense
            monthYear={monthRequested}
            userUID={uid}
            expensesSelected={selectedExpenses}
            updateExpenseLocal={handleChangeExpenses}
          />
        </div>
      </div>
      {snackBarInfo.open ? (
        <AlertNotification
          snackbarInfo={snackBarInfo}
          onClose={closeSnackBar}
        />
      ) : null}
    </div>
  );
};

export default ExpensesPage;
