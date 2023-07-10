import React, { useRef, useState } from "react";
import "./SimulationPage.css";
import { useEffect } from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import ModalEdition from "../pure/ModalEdition";

const SimulationPage = () => {
  const [simulation, setSimulation] = useState({ income: 0, expenses: [] });
  const [ascendentOrder, setAscendentOrder] = useState(false);
  const [error, setError] = useState({
    isError: false,
    input: "",
    errorMessage: "",
  });
  const [labelMove, setLabelMove] = useState({
    amountLabel: false,
    nameLabel: false,
  });
  const [editionMode, setEditionMode] = useState({
    editOpen: false,
    item: {},
    index: -1,
  });

  const incomeRef = useRef();
  const expenseRefAmount = useRef();
  const expenseRefDescription = useRef();
  const selectRef = useRef();

  const handleIncomeUpdate = () => {
    if (isNaN(incomeRef.current.value)) {
      setError({ isError: true, errorMessage: "Only numbers" });
    } else if (+incomeRef.current.value < 1) {
      setError({ isError: true, errorMessage: "Value must be greater than 0" });
    } else {
      setError({ isError: false, errorMessage: "" });
      setSimulation({ ...simulation, income: +incomeRef.current.value });
    }
  };

  const handleExpensesUpdate = () => {
    if (expenseRefAmount.current.value === "") {
      setError({
        ...error,
        isError: true,
        input: "amount",
        errorMessage: "This field is required",
      });
    } else if (+expenseRefAmount.current.value < 1) {
      setError({
        isError: true,
        input: "amount",
        errorMessage: "Value must be greater than 0",
      });
    } else if (expenseRefDescription.current.value === "") {
      setError({ isError: true, errorMessage: "This field is required" });
    } else {
      setSimulation({
        ...simulation,
        expenses: [
          ...simulation.expenses,
          {
            category: selectRef.current.value,
            name: expenseRefDescription.current.value,
            amount: expenseRefAmount.current.value,
          },
        ],
      });
      selectRef.current.value = "";
      expenseRefDescription.current.value = "";
      expenseRefAmount.current.value = "";
      setLabelMove({ amountLabel: false, nameLabel: false });
    }
  };

  const openModal = (element, index) => {
    setEditionMode({ ...editionMode, item: null });
    setEditionMode({ editOpen: true, item: element, index: index });
  };

  const closeModal = (element, boolean, index, deleteItem) => {
    if (boolean) {
      let updatedList = [...simulation.expenses];
      if (deleteItem) {
        updatedList.splice(index, 1);
      } else {
        updatedList[index] = element;
      }
      setSimulation({
        ...simulation,
        expenses: updatedList,
      });
    }
    setEditionMode({ ...editionMode, editOpen: false });
  };

  const confirmSimulation = () => {};

  const toogleLabels = (type, action) => {
    if (action === "focus") {
      setLabelMove({ ...labelMove, [type]: true });
    } else {
      if (type === "amountLabel") {
        if (expenseRefAmount.current.value === "") {
          setLabelMove({ ...labelMove, [type]: false });
        }
      } else {
        if (expenseRefDescription.current.value === "") {
          setLabelMove({ ...labelMove, [type]: false });
        }
      }
    }
  };

  const sortTable = (criteria) => {
    setAscendentOrder(!ascendentOrder);
    let orderedList = [];
    switch (criteria) {
      case "category":
        orderedList = [...simulation.expenses].sort((a, b) =>
          a.category.toLowerCase() > b.category.toLowerCase()
            ? ascendentOrder
              ? 1
              : -1
            : a.category.toLowerCase() < b.category.toLowerCase()
            ? ascendentOrder
              ? -1
              : 1
            : 0
        );
        setSimulation({ ...simulation, expenses: orderedList });
        break;
      case "name":
        orderedList = [...simulation.expenses].sort((a, b) =>
          a.name.toLowerCase() > b.name.toLowerCase()
            ? ascendentOrder
              ? 1
              : -1
            : a.name.toLowerCase() < b.name.toLowerCase()
            ? ascendentOrder
              ? -1
              : 1
            : 0
        );
        setSimulation({ ...simulation, expenses: orderedList });
        break;
      case "amount":
        orderedList = [...simulation.expenses].sort((a, b) =>
          ascendentOrder ? a.amount - b.amount : b.amount - a.amount
        );
        setSimulation({ ...simulation, expenses: orderedList });
        break;
      default:
        return;
    }
  };

  return (
    <div className="simulation-main-container">
      <div className="input-container">
        {!simulation.income ? (
          <div className="income-input">
            <label>¿Cual es tu ingreso esperado?</label>
            <input
              ref={incomeRef}
              className={`simulation-input ${
                !error.isError ? "sim-input-ok" : "sim-input-error"
              }`}
              type="number"
            />
            {error.isError ? (
              <div className="sim-error">
                <p>{error.errorMessage}</p>
              </div>
            ) : null}
            <button onClick={handleIncomeUpdate}>Confirmar</button>
          </div>
        ) : (
          <div className="expenses-input">
            <label>Ingresa tus gastos estimados</label>
            <div className="category-input">
              <label>Categoría: </label>
              <select ref={selectRef}>
                <option>Alquiler</option>
                <option>Servicios</option>
                <option>Internet</option>
                <option>Telefonía</option>
                <option>Streamings</option>
                <option>Gimnasio</option>
                <option>Auto</option>
                <option>Supermercado</option>
                <option>Ocio</option>
                <option>Gustos</option>
                <option>Delivery</option>
                <option>Salidas</option>
                <option>Otros</option>
              </select>
            </div>
            <div className="expenses-input-subcontainer">
              <div>
                <label className={labelMove.nameLabel ? "label-move" : ""}>
                  Nombre
                </label>
                <input
                  onFocus={() => toogleLabels("nameLabel", "focus")}
                  onBlur={() => toogleLabels("nameLabel", "blur")}
                  ref={expenseRefDescription}
                  className={`simulation-input ${
                    !error.isError ? "sim-input-ok" : "sim-input-error"
                  }`}
                />
              </div>
              <div>
                <label className={labelMove.amountLabel ? "label-move" : ""}>
                  Monto
                </label>
                <input
                  onFocus={() => toogleLabels("amountLabel", "focus")}
                  onBlur={() => toogleLabels("amountLabel", "blur")}
                  ref={expenseRefAmount}
                  className={`simulation-input ${
                    !error.isError ? "sim-input-ok" : "sim-input-error"
                  } `}
                  type="number"
                />
              </div>
            </div>
            <div className="sim-table-container">
              <table className="sim-expenses-list">
                {simulation?.expenses?.length > 0 ? (
                  <tr>
                    <th onClick={() => sortTable("category")}>Categoria</th>
                    <th onClick={() => sortTable("name")}>Nombre</th>
                    <th onClick={() => sortTable("amount")}>Monto</th>
                  </tr>
                ) : null}

                {simulation.expenses.map((expense, index) => (
                  <tr>
                    <td>{expense.category}</td>
                    <td>{expense.name}</td>
                    <td>${expense.amount}</td>
                    <td
                      className="edit-column"
                      onClick={() => openModal(expense, index)}
                    >
                      <ModeEditIcon fontSize="small" />
                    </td>
                  </tr>
                ))}
              </table>
            </div>
            <button onClick={handleExpensesUpdate}> Agregar </button>
            <button onClick={confirmSimulation}>Confirmar</button>
          </div>
        )}
        <ModalEdition editionState={editionMode} closeModal={closeModal} />
      </div>
    </div>
  );
};

export default SimulationPage;
