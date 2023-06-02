import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isLoggedIn, setisLoggedIn] = useState(
    localStorage.getItem("userUID") !== null
  );

  const toggleLoggedIn = (boolean) => {
    setisLoggedIn(boolean);
  };

  const contextValue = {
    isLoggedIn,
    toggleLoggedIn,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
