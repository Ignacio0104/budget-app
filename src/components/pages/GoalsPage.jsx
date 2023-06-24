import React, { useEffect, useState } from "react";
import FormAddGoal from "../pure/FormAddGoal";
import "./GoalsPage.css";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { app } from "../../firebase/fibaseConfig";
import { useLocation } from "react-router-dom";
import { CircularProgress, LinearProgress } from "@mui/material";
import DepositsList from "../pure/DepositsList";
import useFirebase from "../../hooks/useFirebase";

const GoalsPage = () => {
  const [creationFormOpen, setCreationFormOpen] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [goals, setGoals] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const { fetchUserData } = useFirebase();

  const fetchGoals = async () => {
    let response = await fetchUserData("goals");
    const goalsToArray = Object.keys(response.data).map((key) => ({
      key,
      ...response.data[key],
    }));
    setIsFetching(false);
    setGoals(goalsToArray);
  };
  useEffect(() => {
    fetchGoals();
  }, []);

  useEffect(() => {
    if (!creationFormOpen) {
      setIsFetching(true);
      fetchGoals();
    }
  }, [creationFormOpen]);

  const handleChangeSelection = (goal) => {
    if (selectedGoal === null) {
      setSelectedGoal(goal);
    }
    if (goal === null) {
      setSelectedGoal(null);
    }
  };
  const getCurrency = (goal) => {
    switch (goal.currency) {
      case "Pesos":
        return "$";
      case "Euros":
        return "€";
      case "Dolares":
        return "US$";
      default:
        return "$";
    }
  };

  const calculatePercentaje = (goal) => {
    if (goal.deposits) {
      const depositsArray = Object.entries(goal.deposits).map(
        ([date, value]) => ({
          date,
          value,
        })
      );
      let totalDeposit = depositsArray.reduce(
        (acc, curr) => acc + curr.value,
        0
      );
      let percentage = (totalDeposit * 100) / goal.total;
      return percentage <= 100 ? percentage : 100;
    } else {
      return 0;
    }
  };

  if (isFetching) {
    return (
      <div className="spinner-container">
        <CircularProgress size={80} />
      </div>
    );
  }

  return (
    <div>
      {creationFormOpen ? (
        <div className="goal-creation-container">
          {creationFormOpen ? <FormAddGoal /> : null}
        </div>
      ) : goals.length > 0 ? (
        <div className="goal-cards-container">
          {goals.map((goal, i) => (
            <div
              key={i}
              className={`goal-card ${
                selectedGoal?.key === goal.key ? "selected-card" : ""
              }`}
              onClick={() => handleChangeSelection(goal)}
            >
              <div className="goal-card-image-container">
                <img src={goal.image} alt="goal"></img>
              </div>
              <div className="goal-text-container">
                <h3>{goal.key}</h3>
                <h4>
                  {getCurrency(goal)}
                  {goal.total}
                </h4>
              </div>
              <div className="percentage-goal-card">
                <LinearProgress
                  color="secondary"
                  variant="determinate"
                  value={calculatePercentaje(goal)}
                />
              </div>
              {selectedGoal ? (
                <div className="deposits-container">
                  <DepositsList
                    deposits={goal.deposits}
                    toogleSelected={handleChangeSelection}
                  />
                </div>
              ) : null}
            </div>
          ))}
        </div>
      ) : (
        <div className="no-results-container">
          <h3>No se encontraron objetivos</h3>
        </div>
      )}
      <button
        className="goal-form-toggle"
        onClick={() => setCreationFormOpen(!creationFormOpen)}
      >
        {creationFormOpen ? "Cerrar Formulario" : "Crear Objetivo"}
      </button>
    </div>
  );
};

export default GoalsPage;
