import React, { createContext, useEffect, useState } from "react";
import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/pure/Navbar";
import LoginPage from "./components/pages/LoginPage";
import HomePage from "./components/pages/HomePage";
import RegisterPage from "./components/pages/RegisterPage";
import ResetPassword from "./components/pages/ResetPassword";
import { onAuthStateChanged } from "firebase/auth";
import Loader from "./components/pure/Loader";
import ExpensesPage from "./components/pages/ExpensesPage";
import GoalsPage from "./components/pages/GoalsPage";
import SimulationPage from "./components/pages/SimulationPage";
import useFirebase from "./hooks/useFirebase";
import AlertNotification from "./components/pure/AlertNotification";
import { withServiceWorkerUpdater } from "@3m1/service-worker-updater";

export const AppContext = createContext(null);

function App(props) {
  const [isLoggedIn, setIsLoggedIn] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [updateNotification, setUpdateNotification] = useState({
    open: true,
    message:
      "La aplicación se va a actualizar, hace click en cualquier parte de la pantalla para refrescar",
    severity: "success",
  });
  const { auth } = useFirebase();
  const { newServiceWorkerDetected, onLoadNewServiceWorkerAccept } = props;

  const toogleLoggedIn = () => {
    setIsLoggedIn(auth.currentUser);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(user);
      setIsInitialRender(false);
    });
  }, [auth]);

  useEffect(() => {
    if (!isInitialRender) {
      setIsLoading(false);
    }
  }, [isLoggedIn]);

  const closeUpdateBar = () => {
    onLoadNewServiceWorkerAccept();
    console.log("Instalado desde el main");
    setUpdateNotification({ ...updateNotification, open: false });
  };

  return (
    <AppContext.Provider value={{ userLoggedIn: isLoggedIn }}>
      {newServiceWorkerDetected ? (
        <AlertNotification
          snackbarInfo={updateNotification}
          onClose={closeUpdateBar}
        />
      ) : null}
      <div className="App">
        <div className="background">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>

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

export default withServiceWorkerUpdater(App);
