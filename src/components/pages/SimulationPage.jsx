import React, { useEffect, useState } from "react";
import "./SimulationPage.scss";

import SimulationCreation from "../pure/SimulationCreation";
import SimulationDisplay from "../pure/SimulationDisplay";
import useFirebase from "../../hooks/useFirebase";

const SimulationPage = () => {
  const [simulations, setSimulations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSimulation, setSelectedSimulation] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const { updateItemDb, fetchUserData } = useFirebase();

  useEffect(() => {
    fetchSimulation();
  }, []);

  const fetchSimulation = async () => {
    setIsLoading(true);
    fetchUserData("simulations")
      .then((res) => {
        setSimulations(
          Object.keys(res.data).map((key) => ({
            key,
            ...res.data[key],
          }))
        );
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const toogleEditMode = async (boolean) => {
    if (!boolean & selectedSimulation) {
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

  const handleSimulationSelection = (sim) => {
    setSelectedSimulation(sim);
  };

  const handleSelectedSim = (object) => {
    setSelectedSimulation(object);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="simulation-main-container">
      {editMode ? (
        <SimulationCreation
          simulationProp={selectedSimulation}
          handleSimulation={updateSimulationState}
          exitEditMode={toogleEditMode}
        />
      ) : (simulations.length > 0) & !selectedSimulation ? (
        <div>
          {simulations.map((sim, index) => (
            <div
              key={index}
              className="sim-card"
              onClick={() => handleSimulationSelection(sim)}
            >
              <h2>{sim.key}</h2>
              <h4>${sim.income}</h4>
            </div>
          ))}
          <div className="sim-creation-btn">
            <button onClick={() => setEditMode(!editMode)}>
              Crear simulacion
            </button>
          </div>
        </div>
      ) : (
        <SimulationDisplay
          simulation={selectedSimulation}
          exitEditMode={toogleEditMode}
          toogleSelected={handleSelectedSim}
        />
      )}
    </div>
  );
};

export default SimulationPage;
