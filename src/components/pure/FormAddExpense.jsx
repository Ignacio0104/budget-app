import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import CustomInput from "./CustomInput";
import "./FormAddExpense.css";
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { app } from "../../firebase/fibaseConfig";

const expenseSchema = yup.object().shape({
  date: yup.date().required("This field is required!"),
  amount: yup
    .number()
    .required("This field is required!")
    .min(1, "Amount must be greater than 0!"),
  description: yup
    .string()
    .required("This field is required!")
    .min(2, "Description too short!"),
});

const FormAddExpense = ({ monthYear, userUID }) => {
  const [dateLimit, setDateLimit] = useState({});
  const [expenseToSubmit, setExpenseToSubmit] = useState({
    date: `${monthYear.year}-${
      monthYear.month < 10 ? "0" + monthYear.month : monthYear.month
    }-01`,
    amount: 1,
    description: "",
  });
  const calculateMonth = () => {
    switch (+monthYear.month) {
      case 1:
      case 3:
      case 5:
      case 7:
      case 8:
      case 10:
      case 12:
        return 31;
      case 2:
        if (monthYear.year % 4 === 0) {
          return 29;
        } else {
          return 28;
        }
      case 4:
      case 6:
      case 9:
      case 11:
        return 30;
      default:
        return 30;
    }
  };

  useEffect(() => {
    let lastDay = calculateMonth();
    setDateLimit(
      `${monthYear.year}-${
        monthYear.month < 10 ? "0" + monthYear.month : monthYear.month
      }-${lastDay}`
    );
  }, [monthYear]);

  const db = getFirestore(app);

  const handleSubmit = async () => {
    await setDoc(doc(db, "expenses", userUID), {
      [monthYear.year]: [
        {
          [monthYear.month]: {
            ...expenseToSubmit,
          },
        },
      ],
    });
  };
  const handleChange = (field, value) => {
    setExpenseToSubmit({ ...expenseToSubmit, [field]: value });
  };

  return (
    <div className="form-add-expense">
      <Formik
        initialValues={expenseToSubmit}
        onSubmit={handleSubmit}
        validationSchema={expenseSchema}
      >
        {(props) => (
          <Form className="input-container">
            <div className="date-container">
              <label>Fecha: </label>
              <CustomInput
                label="Date"
                name="date"
                type="date"
                min={`${monthYear.year}-${
                  monthYear.month < 10 ? "0" + monthYear.month : monthYear.month
                }-01`}
                max={dateLimit}
                handleChange={handleChange}
              ></CustomInput>
            </div>
            <div className="amount-container">
              <label>Monto: </label>
              <CustomInput
                label="Amount"
                type="number"
                name="amount"
                min={0}
                handleChange={handleChange}
              ></CustomInput>
            </div>
            <div className="description-container">
              <label>Descripcion: </label>
              <CustomInput
                label="Description"
                name="description"
                handleChange={handleChange}
              ></CustomInput>
            </div>
            <button className="submit-btn" type="submit">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormAddExpense;
