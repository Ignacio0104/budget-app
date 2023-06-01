import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import LoginForm from "./components/pure/LoginForm";
import Register from "./components/pure/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/pure/Navbar";
import LandingPage from "./components/pages/LandingPage";

function App() {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  useEffect(() => {
    setisLoggedIn(localStorage.getItem("userId") !== null);
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        {isLoggedIn ? <Navbar /> : <LandingPage />}
        <Routes>
          <Route path="/login" element={<LoginForm />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
