import { CircularProgress } from "@mui/material";
import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="loader-container">
      <h1>Welcome</h1>
      <CircularProgress />
    </div>
  );
};

export default Loader;
