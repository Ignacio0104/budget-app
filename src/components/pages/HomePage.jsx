import React, { useEffect } from "react";

import { getAuth } from "firebase/auth";
import { useState } from "react";
import "./HomePage.css";
import ExpensesCard from "../pure/ExpensesCard";
import GoalsCard from "../pure/GoalsCard";
import { Link } from "react-router-dom";
import SimulationCard from "../pure/SimulationCard";
import useFirebase from "../../hooks/useFirebase";
import { CircularProgress } from "@mui/material";
import AlertNotification from "../pure/AlertNotification";

const HomePage = () => {
  const [expenses, setExpenses] = useState([]);
  const [goals, setGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [snackBarInfo, setSnackBarInfo] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const closeSnackBar = () => {
    setSnackBarInfo({ open: false, message: "", severity: "" });
  };

  const { fetchUserData } = useFirebase();

  const fetchUserInformation = async () => {
    if (getAuth().currentUser) {
      let expenses = await fetchUserData("expenses");
      if (expenses.response === "OK") {
        setExpenses(expenses.data);
      } else {
        setSnackBarInfo({
          open: true,
          error: expenses.data,
          severity: "warning",
        });
      }
      let goals = await fetchUserData("goals");
      if (goals.response === "OK") {
        setGoals(goals.data);
      } else {
        setSnackBarInfo({
          open: true,
          error: expenses.data,
          severity: "warning",
        });
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserInformation();
  }, []);

  if (isLoading) {
    return (
      <div className="spinner-container">
        <CircularProgress size={60}></CircularProgress>
      </div>
    );
  }

  return (
    <div className="home-main-contaner">
      <Link to={"/expenses"}>
        <ExpensesCard expenses={expenses} />
      </Link>
      <Link to={"/goals"}>
        <GoalsCard goals={goals} />
      </Link>
      <Link to={"/simulation"}>
        <SimulationCard />
      </Link>
      {snackBarInfo.open ? (
        <AlertNotification
          snackbarInfo={snackBarInfo}
          onClose={closeSnackBar}
        />
      ) : null}
    </div>
  );
};

export default HomePage;
