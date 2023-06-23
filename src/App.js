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
import useFirebase from "./hooks/useFirebase";

export const AppContext = createContext(null);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const { auth, checkLogin } = useFirebase();

  const toogleLoggedIn = () => {
    setIsLoggedIn(auth.currentUser);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(user);
      setIsInitialRender(false);
    });

    return () => {
      unsubscribe();
    };
  }, [auth]);

  useEffect(() => {
    if (!isInitialRender) {
      setIsLoading(false);
    }
  }, [isLoggedIn]);

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
              element={
                auth.currentUser ? (
                  <HomePage />
                ) : (
                  <LoginPage handleLogin={toogleLoggedIn} />
                )
              }
            ></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </AppContext.Provider>
  );
}

export default App;
