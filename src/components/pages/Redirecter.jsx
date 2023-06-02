import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
const Redirecter = ({ userState }) => {
  console.log(userState);
  return (
    <div>
      {userState ? (
        <Navigate to="/home" replace={true} />
      ) : (
        <Navigate to="/loginPage" replace={true} />
      )}
    </div>
  );
};

export default Redirecter;
