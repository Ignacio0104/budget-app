import React, { useState } from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
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

  const calculateSavings = () => {
    let total =
      simulation.income -
      getPercentagesArray().reduce(
        (acc, curr) => acc + curr[Object.keys(curr)[0]].total,
        0
      );
    let percentage = ((total * 100) / simulation.income).toFixed(2);
    return { total, percentage };
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
              key={index}
            >
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
              >
                <Typography>
                  {expandedIndex === index ? (
                    <ArrowDropDownIcon />
                  ) : (
                    <ArrowRightIcon />
                  )}
                  {Object.keys(exp)[0]}
                </Typography>
                <Typography>
                  ${exp[Object.keys(exp)[0]].total} /{" "}
                  {(
                    (exp[Object.keys(exp)[0]].total / +simulation.income) *
                    100
                  ).toFixed(2)}
                  %
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {exp[Object.keys(exp)[0]].elements.map((element) => (
                  <div className="accordion-details">
                    <p>{element.name}</p>
                    <p>
                      ${element.amount} /{" "}
                      {(
                        (element.amount / +exp[Object.keys(exp)[0]].total) *
                        100
                      ).toFixed(2)}
                      %
                    </p>
                  </div>
                ))}
              </AccordionDetails>
            </Accordion>
          ))}
          <Accordion expanded={false} onChange={handleChange(-1)}>
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <Typography>Resto/Ahorro</Typography>
              <Typography>
                ${calculateSavings().total} / {calculateSavings().percentage}%
              </Typography>
            </AccordionSummary>
            <AccordionDetails></AccordionDetails>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default SimulationDisplay;
