import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
const Redirecter = () => {
  const auth = getAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(auth.currentUser);
  console.log(isLoggedIn);

  return (
    <div>
      {isLoggedIn ? (
        <Navigate to="/home" replace={true} />
      ) : (
        <Navigate to="/loginPage" replace={true} />
      )}
    </div>
  );
};

export default Redirecter;
