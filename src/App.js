import React, { createContext, useContext, useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/pure/Navbar";
import LoginPage from "./components/pages/LoginPage";
import HomePage from "./components/pages/HomePage";
import RegisterPage from "./components/pages/RegisterPage";
import ResetPassword from "./components/pages/ResetPassword";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Loader from "./components/pure/Loader";
import ExpensesPage from "./components/pages/ExpensesPage";
import GoalsPage from "./components/pages/GoalsPage";
import SimulationPage from "./components/pages/SimulationPage";

export const AppContext = createContext(null);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const auth = getAuth();

  const toogleLoggedIn = () => {
    setIsLoggedIn(auth.currentUser);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(user);
    });

    return () => {
      unsubscribe(); // Cleanup the listener when the component unmounts
    };
  }, [auth]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <AppContext.Provider value={{ userLoggedIn: isLoggedIn }}>
      <div className="App">
        <BrowserRouter>
          {isLoading && <Loader />}
          <Navbar />
          <Routes>
            <Route
              path="/loginPage"
              element={<LoginPage handleLogin={toogleLoggedIn} />}
            ></Route>
            <Route path="/home" element={<HomePage />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>
            <Route path="/resetPassword" element={<ResetPassword />}></Route>
            <Route path="/expenses" element={<ExpensesPage />}></Route>
            <Route path="/goals" element={<GoalsPage />}></Route>
            <Route path="/simulation" element={<SimulationPage />}></Route>
            <Route
              path="/"
              element={getAuth().currentUser ? <HomePage /> : <LoginPage />}
            ></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </AppContext.Provider>
  );
}

export default App;
