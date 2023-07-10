import React, { useState } from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import "./SimulationDisplay.css";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";

const SimulationDisplay = ({ simulation, exitEditMode }) => {
  const [expandedIndex, setExpandedIndex] = useState(-1);

  const handleChange = (index) => (event, newExpanded) => {
    if (index === expandedIndex) {
      setExpandedIndex(-1);
    } else {
      setExpandedIndex(index);
    }
  };

  const getPercentagesArray = () => {
    let percentagesArray = [];
    simulation.expenses.map((exp) => {
      let indexOfCategory = percentagesArray.findIndex(
        (obj) => exp.category in obj
      );
      if (indexOfCategory === -1) {
        percentagesArray.push({ [exp.category]: { total: 0, elements: [] } });
        indexOfCategory = percentagesArray.findIndex(
          (obj) => exp.category in obj
        );
      }
      let existingObject = percentagesArray[indexOfCategory];
      existingObject[exp.category].total += +exp.amount;
      existingObject[exp.category].elements.push(exp);
    });
    return percentagesArray;
  };

  return (
    <div className="simulation-info-container">
      <div className="simulation-header">
        <h4>
          Presupuesto: <br /> <p>${simulation.income}</p>
        </h4>
        <div className="edit-icon" onClick={() => exitEditMode(true)}>
          <ModeEditIcon />
        </div>
      </div>
      <div className="simulation-graphics">
        <div className="simulation-list-container">
          {getPercentagesArray()?.map((exp, index) => (
            <Accordion
              expanded={expandedIndex === index}
              onChange={handleChange(index)}
            >
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
              >
                <Typography>{Object.keys(exp)[0]}</Typography>
                <Typography> ${exp[Object.keys(exp)[0]].total}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SimulationDisplay;
