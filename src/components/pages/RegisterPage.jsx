import React, { useEffect, useState } from "react";
import "./RegisterPage.css";
import Register from "../pure/RegisterForm";
import { Alert, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [error, setError] = useState("");
  const [modalErrorOpen, setModalErrorOpen] = useState(false);
  useEffect(() => {
    setModalErrorOpen(error !== "");
  }, [error]);
  const [submitCorrect, setSubmitCorrect] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (submitCorrect) {
      navigate("/loginPage");
    }
  }, [submitCorrect]);

  return (
    <div className="register-main-container">
      <div className="register-container">
        <h2 className="main-title">Registrate</h2>
        <Register handleError={setError} confirmSubmit={setSubmitCorrect} />
      </div>
      <Snackbar
        open={modalErrorOpen}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="warning" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default RegisterPage;
