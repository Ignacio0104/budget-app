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
    setExpandedIndex(index);
  };
  // simulation.expenses.map((exp) => {
  //   let indexOfCategory = percentagesArray.findIndex(
  //     (obj) => exp.category in obj
  //   );
  //   if (indexOfCategory === -1) {
  //     percentagesArray.push(([exp.category] = { elements: [] }));
  //   } else {
  //   }
  // });
  // console.log(percentagesArray);
  const getPercentagesArray = () => {
    let percentagesArray = [];
  };

  return (
    <div className="simulation-info-container">
      <div className="simulation-header">
        <h4>
          Presupuesto: <br /> <h2>${simulation.income}</h2>
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
                <Typography>{exp.category}</Typography>
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
