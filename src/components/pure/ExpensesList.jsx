import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import "./ExpensesList.css";
import { Box, Button, Modal, Typography } from "@mui/material";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { app } from "../../firebase/fibaseConfig";

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

const ExpensesList = ({ expenses, userUID, monthYear, updateList }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState({
    confirm: false,
    index: -1,
  });
  const db = getFirestore(app);
  const handleDelete = (i) => {
    setConfirmDelete({ ...confirmDelete, index: i });
    setModalOpen(true);
  };

  const deleteItemDb = async () => {
    expenses.splice(confirmDelete.index, 1);
    await setDoc(
      doc(db, "expenses", userUID),
      { [monthYear.year]: { [monthYear.month]: expenses } },
      { merge: true }
    );
    updateList();
  };

  useEffect(() => {
    if (confirmDelete.confirm) {
      deleteItemDb();
    }
  }, [confirmDelete]);

  const closeModal = (boolean) => {
    setModalOpen(false);
    setConfirmDelete({ ...confirmDelete, confirm: boolean });
  };
  return (
    <div className="list-container">
      {expenses.map((exp, index) => (
        <div key={index} className="expense-list-item">
          <p>{exp.date}</p>
          <p>{exp.description}</p>
          <div className="amount-trash-container">
            <p>${exp.amount}</p>
            <div
              className="trash-icon-container"
              onClick={() => handleDelete(index)}
            >
              <DeleteIcon color="warning" />
            </div>
          </div>
        </div>
      ))}
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

export default ExpensesList;
