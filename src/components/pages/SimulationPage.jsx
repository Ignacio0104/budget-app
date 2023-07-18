import React, { useEffect, useRef, useState } from "react";
import "./SimulationPage.scss";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SimulationCreation from "../pure/SimulationCreation";
import SimulationDisplay from "../pure/SimulationDisplay";
import useFirebase from "../../hooks/useFirebase";
import HelpPopover from "../pure/HelpPopover";

const SimulationPage = () => {
  const [simulations, setSimulations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSimulation, setSelectedSimulation] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [helpPopover, setHelpPopover] = useState(false);
  const helpIconRef = useRef();

  const { updateItemDb, fetchUserData, removeField } = useFirebase();

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

  const deleteSimulation = async (simToDelete) => {
    let filteredArray = [...simulations].filter(
      (sim) =>
        sim.title !== simToDelete.title && sim.income !== simToDelete.income
    );
    setSimulations(filteredArray);
    await removeField("simulations", simToDelete);
    setEditMode(false);
    setSelectedSimulation(null);
  };

  const updateSimulationState = async (newSim, creation) => {
    setSelectedSimulation(newSim);
    setSimulations((prevSimulations) =>
      prevSimulations.map((sim) =>
        (sim.key === newSim.key) & (sim.income === newSim.income) ? newSim : sim
      )
    );
    await updateItemDb("simulations", {
      [newSim.title]: newSim,
    });
  };

  const handleSimulationSelection = (sim) => {
    setSelectedSimulation(sim);
  };

  const toggleHelpPopover = () => {
    setHelpPopover(!helpPopover);
  };
  const handleSelectedSim = (object) => {
    setSelectedSimulation(object);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="simulation-main-container">
      <div
        className="help-icon-container"
        onClick={toggleHelpPopover}
        ref={helpIconRef}
      >
        <HelpOutlineIcon fontSize="large" color="info" />
      </div>
      {editMode || simulations.length < 1 ? (
        <SimulationCreation
          simulationProp={selectedSimulation}
          handleSimulation={updateSimulationState}
          deleteSimulation={deleteSimulation}
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
      {helpPopover ? (
        <HelpPopover
          open={helpPopover}
          handleClose={toggleHelpPopover}
          anchor={helpIconRef.current}
          message={2}
        />
      ) : null}
    </div>
  );
};

export default SimulationPage;
