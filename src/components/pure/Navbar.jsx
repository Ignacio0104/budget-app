import React, { useContext, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import "./Navbar.css";
import useFirebase from "../../hooks/useFirebase";

const Navbar = () => {
  const [openResponsive, setOpenResponsive] = useState(false);
  const { auth } = useFirebase();
  const navigate = useNavigate();
  const TestLogout = () => {
    signOut(auth);
    navigate("/loginPage");
  };

  const toggleMenu = () => {
    setOpenResponsive(!openResponsive);
  };

  return (
    <div
      className="hide-nav-container"
      style={{ display: getAuth().currentUser ? "flex" : "none" }}
    >
      <div className="navbar-main-container-responsive">
        <div className="logo-name-container">
          <span onClick={toggleMenu}>
            {!openResponsive ? <MenuIcon /> : <CloseIcon />}
          </span>
          <h3>Expense Tracker</h3>
        </div>
        <div
          className={`routes-navbar-container-responsive ${
            openResponsive ? "menu-visible" : "menu-hide"
          }`}
        >
          <span onClick={toggleMenu}>
            <Link to={"/home"}>Home</Link>
            <Link to={"/expenses"}>Gastos</Link>
            <Link to={"/goals"}>Objetivos</Link>
            <Link to={"/simulation"}>Simulaciones</Link>
            <button onClick={() => TestLogout()}>Log out</button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
