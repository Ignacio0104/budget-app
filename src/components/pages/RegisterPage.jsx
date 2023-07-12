import React, { useEffect, useState } from "react";
import "./RegisterPage.scss";
import Register from "../pure/RegisterForm";
import { Link, useNavigate } from "react-router-dom";
import AlertNotification from "../pure/AlertNotification";
import WestIcon from "@mui/icons-material/West";

const RegisterPage = () => {
  const [snackBarInfo, setSnackBarInfo] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const [submitCorrect, setSubmitCorrect] = useState(false);

  const navigate = useNavigate();
  const updateSnackBar = (open, message, severity) => {
    setSnackBarInfo({ open: open, message: message, severity: severity });
  };
  const closeSnackBar = () => {
    setSnackBarInfo({ open: false, message: "", severity: "" });
  };

  useEffect(() => {
    if (submitCorrect) {
      navigate("/loginPage");
    }
  }, [submitCorrect]);

  return (
    <div className="register-main-container">
      <div className="register-container">
        <div className="back-arrow-container">
          <Link to={"/loginPage"}>
            <WestIcon />
          </Link>
        </div>
        <h2 className="main-title">Registrate</h2>
        <Register
          handleError={updateSnackBar}
          confirmSubmit={setSubmitCorrect}
        />
      </div>
      {snackBarInfo.open ? (
        <AlertNotification
          snackbarInfo={snackBarInfo}
          onClose={closeSnackBar}
        />
      ) : null}
    </div>
  );
};

export default RegisterPage;
