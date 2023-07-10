import React, { useEffect, useState } from "react";
import "./SimulationPage.css";

import SimulationCreation from "../pure/SimulationCreation";
import SimulationDisplay from "../pure/SimulationDisplay";
import useFirebase from "../../hooks/useFirebase";

const SimulationPage = () => {
  const [simulation, setSimulation] = useState({ income: 0, expenses: [] });
  const [editMode, setEditMode] = useState(true);

  const { updateItemDb, fetchUserData } = useFirebase();

  useEffect(() => {
    fetchSimulation();
  }, []);

  const fetchSimulation = async () => {
    fetchUserData("simulations")
      .then((res) => setSimulation(res.data))
      .catch((err) => console.log(err));
  };

  const toogleEditMode = async (boolean) => {
    if (!boolean) {
      await updateItemDb("simulations", simulation);
    }
    setEditMode(boolean);
  };

  const checkSimulation = () => {
    return simulation.income > 0 && simulation.expenses.length > 0;
  };

  return (
    <div className="simulation-main-container">
      {editMode ? (
        <SimulationCreation
          simulationProp={simulation}
          handleSimulation={setSimulation}
          exitEditMode={toogleEditMode}
        />
      ) : checkSimulation() ? (
        <SimulationDisplay
          simulation={simulation}
          exitEditMode={toogleEditMode}
        />
      ) : null}
    </div>
  );
};

export default SimulationPage;
