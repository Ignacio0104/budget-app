import React, { useState } from "react";
import "./LoginPage.css";
import LoginForm from "../pure/LoginForm";
import { Link } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";
import { TransitionDown } from "../utils/snackBarAnimations";

const LoginPage = ({ handleLogin }) => {
  const [modalError, setModalError] = useState({ open: false, error: "" });
  return (
    <div className="landing-container">
      <div className="message-container">
        <h3>Bienvenido/a</h3>
        <p>
          Organiza tus gastos y planifica tu futuro financiero con nuestra
          intuitiva aplicación. Registra tus gastos fácilmente, establece metas
          y realiza simulaciones para proyectar tus gastos futuros. Toma el
          control de tus finanzas personales y alcanza tus objetivos con nuestra
          ayuda.
        </p>
        <div className="division-line"></div>
        <div className="login-container">
          <h4>Ingresa</h4>
          <LoginForm toogleLogin={handleLogin} setError={setModalError} />
        </div>
        <div className="forgot-register-container">
          <Link to={"/resetPassword"} className="forgot-link">
            Olvidaste tu clave?
          </Link>
          <Link to={"/register"} className="register-link">
            Register
          </Link>
        </div>
      </div>
      <Snackbar
        open={modalError.open}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        TransitionComponent={TransitionDown}
        onClose={() => setModalError({ ...modalError, open: false, error: "" })}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          {modalError.error}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default LoginPage;
