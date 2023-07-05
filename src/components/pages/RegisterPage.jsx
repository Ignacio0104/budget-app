import React, { useEffect, useState } from "react";
import "./RegisterPage.css";
import Register from "../pure/RegisterForm";
import { Alert, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AlertNotification from "../pure/AlertNotification";

const RegisterPage = () => {
  const [snackBarInfo, setSnackBarInfo] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const [submitCorrect, setSubmitCorrect] = useState(false);

  const navigate = useNavigate();

  const updateSnackBar = (open, message, severity) => {
    setSnackBarInfo({ open: open, message: message, severity: severity });
  };
  const closeSnackBar = () => {
    setSnackBarInfo({ open: false, message: "", severity: "" });
  };

  useEffect(() => {
    if (submitCorrect) {
      navigate("/loginPage");
    }
  }, [submitCorrect]);

  return (
    <div className="register-main-container">
      <div className="register-container">
        <h2 className="main-title">Registrate</h2>
        <Register
          handleError={updateSnackBar}
          confirmSubmit={setSubmitCorrect}
        />
      </div>
      {snackBarInfo.open ? (
        <AlertNotification
          snackbarInfo={snackBarInfo}
          onClose={closeSnackBar}
        />
      ) : null}
    </div>
  );
};

export default RegisterPage;
