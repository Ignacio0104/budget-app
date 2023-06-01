import React from "react";
import "./LandingPage.css";
import LoginForm from "../pure/LoginForm";

const LandingPage = () => {
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
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
