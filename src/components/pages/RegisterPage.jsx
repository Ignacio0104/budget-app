import React, { useEffect, useState } from "react";
import "./RegisterPage.css";
import Register from "../pure/RegisterForm";
import { Alert, Snackbar } from "@mui/material";

const RegisterPage = () => {
  const [error, setError] = useState("");
  const [modalErrorOpen, setModalErrorOpen] = useState(false);
  useEffect(() => {
    setModalErrorOpen(error !== "");
  }, [error]);

  return (
    <div className="register-main-container">
      <div className="register-container">
        <h2 className="main-title">Registrate</h2>
        <Register handleError={setError} />
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
