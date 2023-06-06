import React, { useContext } from "react";
import PaidIcon from "@mui/icons-material/Paid";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { AppContext } from "../../App";

const Navbar = () => {
  const TestLogout = () => {
    const auth = getAuth();
    signOut(auth);
  };
  const context = useContext(AppContext);
  return (
    <div
      className="hide-nav-container"
      style={{ display: context.userLoggedIn ? "flex" : "none" }}
    >
      <div className="navbar-main-container-responsive">
        <div className="logo-name-container">
          <MenuIcon />
          <h3>Expense Tracker</h3>
          <button onClick={() => TestLogout()}>LogOUT</button>
        </div>
        <div className="routes-navbar-container">
          <Link to={"/"}>Gastos</Link>
          <Link to={"/"}>Objetivos</Link>
          <Link to={"/"}>Simulaciones</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
