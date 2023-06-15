import React, { useEffect, useState } from "react";
import FormAddGoal from "../pure/FormAddGoal";
import "./GoalsPage.css";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { app } from "../../firebase/fibaseConfig";
import { useLocation } from "react-router-dom";
import { CircularProgress, LinearProgress } from "@mui/material";

const GoalsPage = () => {
  const [creationFormOpen, setCreationFormOpen] = useState(true);
  const [isFetching, setIsFetching] = useState(true);
  const [goals, setGoals] = useState([]);
  const db = getFirestore(app);
  const location = useLocation();
  let userUID = location.state.userUID;

  const fetchUserData = async () => {
    const goalsDocRef = doc(db, "goals", userUID);
    const goalsSnapshot = await getDoc(goalsDocRef);
    const goalsToArray = Object.keys(goalsSnapshot?.data()).map((key) => ({
      key,
      ...goalsSnapshot?.data()[key],
    }));
    setGoals(goalsToArray);
  };
  useEffect(() => {
    fetchUserData();
    setIsFetching(false);
  }, []);

  useEffect(() => {
    // console.log(goals);
  }, [goals]);

  const submitItem = async () => {
    let itemToAdd = {
      Gol: {
        deposits: { "2023-10-12": 2000 },
      },
    };
    await setDoc(doc(db, "goals", userUID), itemToAdd, {
      merge: true,
    });
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
      <div className="goal-cards-container">
        {goals.map((goal) => (
          <div className="goal-card">
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
          </div>
        ))}
      </div>
      <div className="goal-creation-container">
        <button
          className="goal-form-toggle"
          onClick={() => setCreationFormOpen(!creationFormOpen)}
        >
          Crear objetivo
        </button>
        {creationFormOpen ? <FormAddGoal /> : null}
      </div>
      <button onClick={submitItem}>Test</button>
    </div>
  );
};

export default GoalsPage;
