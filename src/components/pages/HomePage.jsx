import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect } from "react";
import { app } from "../../firebase/fibaseConfig";
import { getAuth } from "firebase/auth";
import { useState } from "react";
import "./HomePage.css";
import ExpensesCard from "../pure/ExpensesCard";
import GoalsCard from "../pure/GoalsCard";
import { Link } from "react-router-dom";
import SimulationCard from "../pure/SimulationCard";
import useFirebase from "../../hooks/useFirebase";
import { Alert, CircularProgress, Snackbar } from "@mui/material";
import { TransitionDown } from "../utils/snackBarAnimations";

const HomePage = () => {
  const [expenses, setExpenses] = useState([]);
  const [goals, setGoals] = useState([]);
  const [modalError, setModalError] = useState({ open: false, error: "" });
  const [isLoading, setIsLoading] = useState(false);

  const { fetchUserData } = useFirebase();

  const fetchUserInformation = async () => {
    if (getAuth().currentUser) {
      let expenses = await fetchUserData("expenses");
      if (expenses.response === "OK") {
        setExpenses(expenses.data);
      } else {
        setModalError({ open: true, error: expenses.data });
      }
      let goals = await fetchUserData("goals");
      if (goals.response === "OK") {
        setGoals(goals.data);
      } else {
        setModalError({ open: true, error: goals.data });
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
      <Snackbar
        open={modalError.open}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        TransitionComponent={TransitionDown}
        onClose={() => setModalError({ ...modalError, open: false, error: "" })}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          {modalError.error}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default HomePage;
