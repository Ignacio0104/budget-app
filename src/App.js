import React, { useContext, useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/pure/Navbar";
import LoginPage from "./components/pages/LoginPage";
import HomePage from "./components/pages/HomePage";
import Redirecter from "./components/pages/Redirecter";
import RegisterPage from "./components/pages/RegisterPage";
import ResetPassword from "./components/pages/ResetPassword";
import { getAuth } from "firebase/auth";

function App() {
  const auth = getAuth();
  const [isLoggedIn, setisLoggedIn] = useState(auth.currentUser);

  const toogleLoggedIn = (boolean) => {
    setisLoggedIn(boolean);
  };

  return (
    <div className="App">
      <BrowserRouter>
        {isLoggedIn && <Navbar />}
        <Routes>
          <Route
            path="/loginPage"
            element={<LoginPage handleLogin={toogleLoggedIn} />}
          ></Route>
          <Route path="/home" element={<HomePage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/resetPassword" element={<ResetPassword />}></Route>
          <Route
            path="/"
            element={<Redirecter userState={isLoggedIn} />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
