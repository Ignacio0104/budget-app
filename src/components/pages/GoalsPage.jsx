import React, { useEffect, useRef, useState } from "react";
import FormAddGoal from "../pure/FormAddGoal";
import "./GoalsPage.scss";
import {
  CircularProgress,
  LinearProgress,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import DepositsList from "../pure/DepositsList";
import WestIcon from "@mui/icons-material/West";
import useFirebase from "../../hooks/useFirebase";
import AlertNotification from "../pure/AlertNotification";
import HelpPopover from "../pure/HelpPopover";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useNavigate } from "react-router-dom";
import goalsIcon from "../../assets/images/goals.png";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#108314",
      darker: "#0adfd2",
    },
  },
});

const GoalsPage = () => {
  const [creationFormOpen, setCreationFormOpen] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [goals, setGoals] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const { fetchUserData, updateItemDb, removeField } = useFirebase();
  const [snackBarInfo, setSnackBarInfo] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const [helpPopover, setHelpPopover] = useState(false);
  const helpIconRef = useRef();
  const navigate = useNavigate();

  const fetchGoals = async () => {
    let response = await fetchUserData("goals");
    if (response.response === "FAIL") {
      navigate("/home");
    } else {
      const goalsToArray = Object.keys(response.data).map((key) => ({
        key,
        ...response.data[key],
      }));
      setGoals(goalsToArray);
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  useEffect(() => {
    if (selectedGoal) {
      let newGoal = goals.filter((goal) => goal.key === selectedGoal.key);
      setSelectedGoal(newGoal[0]);
    }
  }, [goals]);

  useEffect(() => {
    if (!creationFormOpen) {
      setIsFetching(true);
      fetchGoals();
    }
  }, [creationFormOpen]);

  const handleChangeSelection = (goal) => {
    if (selectedGoal === null || selectedGoal === undefined) {
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
        ([index, object]) => ({
          index,
          object,
        })
      );

      let totalDeposit = depositsArray.reduce(
        (acc, curr) => acc + +curr.object.amount,
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

  const deleteGoal = async (goal) => {
    try {
      await removeField("goals", goal);
      setSnackBarInfo({
        open: true,
        message: "Objetivo borrado con exito",
        severity: "success",
      });
      await fetchGoals();
    } catch (e) {
      console.log(e);
    }
  };

  const toggleHelpPopover = () => {
    setHelpPopover(!helpPopover);
  };

  const closeSnackBar = () => {
    setSnackBarInfo({ open: false, message: "", severity: "" });
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
      <div
        className="help-icon-container"
        onClick={toggleHelpPopover}
        ref={helpIconRef}
      >
        <HelpOutlineIcon fontSize="large" color="info" />
      </div>
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
                selectedGoal?.key === goal.key
                  ? "selected-card"
                  : selectedGoal
                  ? "unselected-card"
                  : ""
              }`}
              onClick={() => handleChangeSelection(goal)}
            >
              <div className="goal-card-image-container">
                <img src={goal.image ? goal.image : goalsIcon} alt="goal"></img>
              </div>
              <div className="goal-text-container">
                <h3>{goal.key}</h3>
                <h4>
                  {`${getCurrency(goal)} `}
                  {goal.total}
                  {selectedGoal?.key === goal.key && (
                    <span className="total-deposit">
                      {goal?.deposits?.length > 0 && <ArrowDropUpIcon />}
                      {goal?.deposits?.length > 0 &&
                        `${getCurrency(goal)} ${goal.deposits.reduce(
                          (acc, curr) => acc + +curr.amount,
                          0
                        )}`}
                    </span>
                  )}
                </h4>
              </div>
              <div className="percentage-goal-card">
                <ThemeProvider theme={theme}>
                  <LinearProgress
                    variant="determinate"
                    color="secondary"
                    value={calculatePercentaje(goal)}
                  />
                </ThemeProvider>
              </div>
              {selectedGoal ? (
                <div
                  className="back-icon"
                  onClick={() => handleChangeSelection(null)}
                >
                  <WestIcon fontSize="large" />
                </div>
              ) : null}

              {selectedGoal?.key === goal.key ? (
                <div className="deposits-container">
                  <DepositsList
                    goal={selectedGoal}
                    handleUpdate={updateGoal}
                    handleGoalDelete={deleteGoal}
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
      {snackBarInfo.open ? (
        <AlertNotification
          snackbarInfo={snackBarInfo}
          onClose={closeSnackBar}
        />
      ) : null}
      {helpPopover ? (
        <HelpPopover
          open={helpPopover}
          handleClose={toggleHelpPopover}
          anchor={helpIconRef.current}
          message={1}
        />
      ) : null}
    </div>
  );
};

export default GoalsPage;
