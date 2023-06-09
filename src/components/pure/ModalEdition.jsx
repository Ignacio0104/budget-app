import { Box, Button, Modal, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import "./ModalEdition.css";

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

const ModalEdition = ({ editionState, closeModal }) => {
  const [error, setError] = useState("");
  const [firstRender, setFirstRender] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState({
    confirmModal: false,
    confirmation: false,
  });
  const [updatedItem, setUpdatedItem] = useState({
    category: editionState.item.category,
    name: editionState.item.name,
    amount: editionState.item.amount,
  });

  useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
    } else {
      checkFields();
    }
  }, [updatedItem]);

  useEffect(() => {
    if (!confirmDelete.confirmModal & confirmDelete.confirmation) {
      handleClose(true, true);
    }
  }, [confirmDelete]);

  const handleChange = (e, field) => {
    setUpdatedItem({
      ...updatedItem,
      [field]: e.target.value,
    });
  };

  const handleClose = (boolean, deleteItem) => {
    if (!error) {
      closeModal(updatedItem, boolean, editionState.index, deleteItem);
      setFirstRender(true);
    }
  };

  const checkFields = () => {
    if (!updatedItem.category || !updatedItem.name || !updatedItem.amount) {
      setError("Por favor, revisa la información ingresada");
    } else {
      setError("");
    }
  };

  return (
    <div className="modal-container">
      <Modal
        open={editionState.editOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {editionState.item.name}
          </Typography>
          <div
            className="delete-icon-container"
            onClick={() =>
              setConfirmDelete({ ...confirmDelete, confirmModal: true })
            }
          >
            <DeleteIcon fontSize="large" className="delete-icon" />
          </div>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}></Typography>
          ¿Desea editar o eliminar este registro?
          <div className="modal-input-container">
            <input
              defaultValue={editionState.item.category}
              onChange={(e) => handleChange(e, "category")}
            />
            <input
              defaultValue={editionState.item.name}
              onChange={(e) => handleChange(e, "name")}
            />
            $
            <input
              type="number"
              defaultValue={editionState.item.amount}
              onChange={(e) => handleChange(e, "amount")}
            />
          </div>
          <div className="error-container">{error ? <p>{error}</p> : null}</div>
          <div className="button-confirmation-container">
            <Button onClick={() => handleClose(true, false)}>Confirmar</Button>
            <Button onClick={() => handleClose(false, false)}>Cancelar</Button>
          </div>
        </Box>
      </Modal>
      <Modal
        open={confirmDelete.confirmModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            ¿Desea borrar el item {editionState.item.name}?
          </Typography>
          <div className="button-confirmation-container">
            <Button
              onClick={() =>
                setConfirmDelete({ confirmModal: false, confirmation: true })
              }
            >
              Confirmar
            </Button>
            <Button
              onClick={() =>
                setConfirmDelete({ confirmModal: false, confirmation: false })
              }
            >
              Cancelar
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalEdition;
