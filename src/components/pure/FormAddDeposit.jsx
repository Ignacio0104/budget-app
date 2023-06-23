import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import CustomInput from "./CustomInput";
import { CircularProgress } from "@mui/material";
import "./FormAddDeposit.css";

const depositSchema = yup.object().shape({
  amount: yup
    .number()
    .required("This field is required!")
    .min(1, "Amount must be greater than 0!"),
});

const FormAddDeposit = () => {
  const [depositToSubmit, setDepositToSubmit] = useState({
    amount: 0,
    date: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    setDepositToSubmit({
      ...depositToSubmit,
      date: new Date().toLocaleDateString(),
    });
  }, []);

  const handleChange = (field, value) => {
    setDepositToSubmit({ ...depositToSubmit, [field]: value });
  };

  const handleDepositSubmit = () => {
    console.log(depositToSubmit);
  };
  return (
    <div className="main-goal-add-container">
      <Formik
        initialValues={depositToSubmit}
        onSubmit={handleDepositSubmit}
        validationSchema={depositSchema}
      >
        {(props) => (
          <Form className="input-container">
            <div className="deposit-amount-container">
              <label>Amount: </label>
              <CustomInput
                label="Amount"
                name="amount"
                type="number"
                handleChange={handleChange}
              ></CustomInput>
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

export default FormAddDeposit;
