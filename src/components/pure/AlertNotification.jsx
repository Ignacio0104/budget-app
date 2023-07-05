import { Alert, Snackbar } from "@mui/material";
import React from "react";
import { TransitionDown } from "../utils/snackBarAnimations";

const AlertNotification = ({ snackbarInfo, onClose }) => {
  const { open, message, severity } = snackbarInfo;
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      TransitionComponent={TransitionDown}
      onClose={onClose}
      //   () => setModalError({ ...modalError, open: false, error: "" })
    >
      <Alert severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AlertNotification;
