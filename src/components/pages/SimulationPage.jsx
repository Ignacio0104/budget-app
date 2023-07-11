import React, { useEffect, useState } from "react";
import "./SimulationPage.css";

import SimulationCreation from "../pure/SimulationCreation";
import SimulationDisplay from "../pure/SimulationDisplay";
import useFirebase from "../../hooks/useFirebase";

const SimulationPage = () => {
  const [simulations, setSimulations] = useState([]);
  const [selectedSimulation, setSelectedSimulation] = useState(null);
  const [editMode, setEditMode] = useState(true);

  const { updateItemDb, fetchUserData } = useFirebase();

  useEffect(() => {
    fetchSimulation();
  }, []);
  useEffect(() => {
    console.log(simulations);
  }, [simulations]);

  useEffect(() => {
    console.log(selectedSimulation);
  }, [selectedSimulation]);

  const fetchSimulation = async () => {
    fetchUserData("simulations")
      .then((res) => {
        setSimulations(
          Object.keys(res.data).map((key) => ({
            key,
            ...res.data[key],
          }))
        );
      })
      .catch((err) => console.log(err));
  };

  const toogleEditMode = async (boolean) => {
    if (!boolean) {
      await updateItemDb("simulations", {
        [selectedSimulation.title]: selectedSimulation,
      });
    }
    setEditMode(boolean);
  };

  const updateSimulationState = (newSim) => {
    setSimulations([...simulations, newSim]);
    setSelectedSimulation(newSim);
  };

  const checkSimulation = () => {
    return (
      selectedSimulation.income > 0 && selectedSimulation.expenses.length > 0
    );
  };

  return (
    <div className="simulation-main-container">
      {(simulations.length > 0) & !selectedSimulation ? (
        <p>Elegi</p>
      ) : editMode ? (
        <SimulationCreation
          simulationProp={selectedSimulation}
          handleSimulation={updateSimulationState}
          exitEditMode={toogleEditMode}
        />
      ) : checkSimulation() ? (
        <SimulationDisplay
          simulation={selectedSimulation}
          exitEditMode={toogleEditMode}
        />
      ) : null}
    </div>
  );
};

export default SimulationPage;
