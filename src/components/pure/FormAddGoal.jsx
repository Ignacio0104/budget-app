import { Form, Formik } from "formik";
import * as yup from "yup";
import React, { useState } from "react";
import CustomInput from "./CustomInput";
import { CircularProgress } from "@mui/material";
import "./FormAddGoal.css";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const goalSchema = yup.object().shape({
  description: yup
    .string()
    .required("This field is required!")
    .min(2, "Description too short!"),
  total: yup
    .number()
    .required("This field is required!")
    .min(1, "Amount must be greater than 0!"),
});

const FormAddGoal = () => {
  const [goalToSubmit, setGoalToSubmit] = useState({
    description: "",
    total: 0,
    currency: "pesos",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();

  const handleChange = (field, value) => {
    setGoalToSubmit({ ...goalToSubmit, [field]: value });
  };

  useEffect(() => {
    console.log(goalToSubmit);
  }, [goalToSubmit]);

  const handleGoalSubmit = async (values, { resetForm }) => {
    setIsSubmitting(true);
    // let goal = {
    //   [goalToSubmit.description]: {
    //     [monthYear.month]: [...expensesSelected, expenseToSubmit],
    //   },
    // };
    // await setDoc(doc(db, "expenses", userUID), expense, { merge: true });
    // updateExpenseLocal();
    // setExpenseToSubmit({
    //   ...expenseToSubmit,
    //   date: `${monthYear.year}-${
    //     monthYear.month < 10 ? "0" + monthYear.month : monthYear.month
    //   }-01`,
    //   amount: 1,
    //   description: "",
    // });
    // setisSubmitting(false);
    // resetForm();
  };
  return (
    <div className="main-goal-add-container">
      <Formik
        initialValues={goalToSubmit}
        onSubmit={handleGoalSubmit}
        validationSchema={goalSchema}
      >
        {(props) => (
          <Form className="input-container">
            <div className="goal-title-container">
              <label>Titulo: </label>
              <CustomInput
                label="Description"
                name="description"
                handleChange={handleChange}
              ></CustomInput>
            </div>
            <div className="goal-total-container">
              <label>Monto: </label>
              <CustomInput
                label="Total"
                type="number"
                name="total"
                min={0}
                handleChange={handleChange}
              ></CustomInput>
            </div>
            <div className="goal-currency-container">
              <label>Moneda: </label>
              <select
                onChange={(e) => handleChange("currency", e.target.value)}
              >
                <option value={"Pesos"}>Pesos</option>
                <option value={"Euros"}>Euros</option>
                <option value={"Dolares"}>Dolares</option>
              </select>
            </div>
            <button className="submit-btn" type="submit">
              {isSubmitting ? (
                <CircularProgress size={20}></CircularProgress>
              ) : (
                "Submit"
              )}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormAddGoal;
