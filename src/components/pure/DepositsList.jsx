import React, { useEffect, useState } from "react";
import "./DepositsList.css";
import FormAddDeposit from "./FormAddDeposit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Typography,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const DepositsList = ({ goal, toogleSelected, handleUpdate }) => {
  const [showForm, setShowForm] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState({
    confirm: false,
    index: -1,
  });
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (confirmDelete.confirm) {
      deleteExpense();
    }
  }, [confirmDelete]);

  const handleDelete = (i) => {
    if (!isLoading) {
      setConfirmDelete({ ...confirmDelete, index: i });
      setModalOpen(true);
    }
  };

  const deleteExpense = async () => {
    setIsLoading(true);
    let depositsCopy = [...goal.deposits];
    depositsCopy.splice(confirmDelete.index, 1);
    await handleUpdate({ [goal.key]: { ...goal, deposits: depositsCopy } });
    setIsLoading(false);
  };

  const closeModal = (boolean) => {
    setModalOpen(false);
    setConfirmDelete({ ...confirmDelete, confirm: boolean });
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const updateGoal = async (deposit) => {
    let newGoal = {
      [goal.key]: {
        ...goal,
        deposits: goal.deposits ? [...goal.deposits, deposit] : [deposit],
      },
    };
    await handleUpdate(newGoal);
  };

  return (
    <div>
      <div className="deposit-list-container">
        {goal.deposits &&
          goal.deposits.map((goal, index) => (
            <div className="deposit-item">
              <p>{goal.date}</p>
              <p>${goal.amount}</p>
              <div
                className="action-icon-container"
                onClick={() => handleDelete(index)}
              >
                {isLoading & (index === confirmDelete.index) ? (
                  <CircularProgress />
                ) : (
                  <DeleteIcon color="warning" />
                )}
              </div>
            </div>
          ))}
      </div>
      <div className="no-deposit-container">
        {(!goal.deposits || goal.deposits.length < 1) && (
          <h2>No hay depositos </h2>
        )}
      </div>
      <div className="add-deposit">
        <button onClick={toggleForm}>
          {showForm ? "Cerrar" : "Crear Deposito"}
        </button>
      </div>
      {showForm ? <FormAddDeposit handleUpdate={updateGoal} /> : null}
      <Modal
        open={modalOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Eliminar gasto
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            ¿Está seguro de que desea borrar el item seleccionado?
          </Typography>
          <div className="button-confirmation-container">
            <Button onClick={() => closeModal(true)}>Confirmar</Button>
            <Button onClick={() => closeModal(false)}>Cancelar</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default DepositsList;
