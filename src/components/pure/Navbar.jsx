import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import "./Navbar.scss";
import useFirebase from "../../hooks/useFirebase";
import graphNavBar from "../../assets/images/graphIcon-navbar-nobg.png";

const Navbar = () => {
  const [openResponsive, setOpenResponsive] = useState(false);
  const { auth } = useFirebase();
  const navigate = useNavigate();
  const logOut = () => {
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
          <h3 className="navbar-title" onClick={() => setOpenResponsive(false)}>
            <Link to={"/home"}>
              Expense <img src={graphNavBar} alt="graph" /> Tracker
            </Link>
          </h3>
        </div>
        <div
          className={`routes-navbar-container-responsive ${
            openResponsive ? "menu-visible" : "menu-hide"
          }`}
        >
          <span onClick={toggleMenu}>
            <Link to={"/expenses"}>Gastos</Link>
            <Link to={"/goals"}>Objetivos</Link>
            <Link to={"/simulation"}>Simulaciones</Link>
            <div className="log-out-container" onClick={logOut}>
              <p>Salir</p>
              <LogoutIcon />
            </div>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
