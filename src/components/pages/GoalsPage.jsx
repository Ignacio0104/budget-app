import React, { useEffect, useState } from "react";
import FormAddGoal from "../pure/FormAddGoal";
import "./GoalsPage.css";
import { CircularProgress, LinearProgress } from "@mui/material";
import DepositsList from "../pure/DepositsList";
import useFirebase from "../../hooks/useFirebase";

const GoalsPage = () => {
  const [creationFormOpen, setCreationFormOpen] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [goals, setGoals] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const { fetchUserData, updateItemDb } = useFirebase();

  const fetchGoals = async () => {
    setIsUpdating(true);
    let response = await fetchUserData("goals");
    const goalsToArray = Object.keys(response.data).map((key) => ({
      key,
      ...response.data[key],
    }));

    setGoals(goalsToArray);
    setIsFetching(false);
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  useEffect(() => {
    setIsUpdating(false);
    let newGoal = goals.filter((goal) => goal.key === selectedGoal.key);
    setSelectedGoal(newGoal[0]);
  }, [goals]);

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

  const updateGoal = async (goalToUpdate) => {
    try {
      await updateItemDb("goals", goalToUpdate);
      await fetchGoals();
    } catch (err) {
      console.log(err);
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
              {selectedGoal?.key === goal.key ? (
                <div className="deposits-container">
                  <DepositsList
                    goal={selectedGoal}
                    toogleSelected={handleChangeSelection}
                    handleUpdate={updateGoal}
                    updatingStatus={isUpdating}
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
