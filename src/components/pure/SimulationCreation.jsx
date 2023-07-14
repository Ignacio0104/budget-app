import React, { useRef, useState } from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import ModalEdition from "./ModalEdition";
import WestIcon from "@mui/icons-material/West";
import "./SimulationCreation.scss";

const SimulationCreation = ({
  simulationProp,
  handleSimulation,
  exitEditMode,
  deleteSimulation,
}) => {
  const [ascendentOrder, setAscendentOrder] = useState(false);
  const [error, setError] = useState({
    isError: false,
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

  const simulationNameRef = useRef();
  const incomeRef = useRef();
  const expenseRefAmount = useRef();
  const expenseRefDescription = useRef();
  const selectRef = useRef();

  const handleIncomeUpdate = () => {
    if (+incomeRef.current.value < 1) {
      setError({ isError: true, errorMessage: "Value must be greater than 0" });
    } else if (simulationNameRef.current?.value === "") {
      setError({ isError: true, errorMessage: "All fields are required" });
    } else {
      setError({ isError: false, errorMessage: "" });
      handleSimulation(
        {
          ...simulationProp,
          title: simulationNameRef.current.value,
          income: +incomeRef.current.value,
          expenses: [],
        },
        true
      );
    }
  };

  const handleExpensesUpdate = () => {
    if (
      expenseRefAmount.current.value === "" ||
      +expenseRefAmount.current.value < 1 ||
      expenseRefDescription.current.value === "" ||
      !selectRef.current.value
    ) {
      setError({
        ...error,
        isError: true,
        errorMessage: "Favor revisa la información ingresada",
      });
    } else {
      handleSimulation(
        {
          ...simulationProp,
          expenses: [
            ...simulationProp.expenses,
            {
              category: selectRef.current.value,
              name: expenseRefDescription.current.value,
              amount: expenseRefAmount.current.value,
            },
          ],
        },
        false
      );
      setError({
        ...error,
        isError: false,
        errorMessage: "",
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
      let updatedList = [...simulationProp.expenses];
      if (deleteItem) {
        updatedList.splice(index, 1);
      } else {
        updatedList[index] = element;
      }
      handleSimulation(
        {
          ...simulationProp,
          expenses: updatedList,
        },
        false
      );
    }
    setEditionMode({ ...editionMode, editOpen: false });
  };

  const confirmSimulation = () => {
    exitEditMode(false);
  };

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

  const deleteSelectedSim = () => {
    deleteSimulation(simulationProp);
    exitEditMode(false);
  };

  const sortTable = (criteria) => {
    setAscendentOrder(!ascendentOrder);
    let orderedList = [];
    switch (criteria) {
      case "category":
        orderedList = [...simulationProp.expenses].sort((a, b) =>
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
        handleSimulation({ ...simulationProp, expenses: orderedList }, false);
        break;
      case "name":
        orderedList = [...simulationProp.expenses].sort((a, b) =>
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
        handleSimulation({ ...simulationProp, expenses: orderedList }, false);
        break;
      case "amount":
        orderedList = [...simulationProp.expenses].sort((a, b) =>
          ascendentOrder ? a.amount - b.amount : b.amount - a.amount
        );
        handleSimulation({ ...simulationProp, expenses: orderedList }, false);
        break;
      default:
        return;
    }
  };

  return (
    <div className="simulation-edit-container">
      <div className="input-container">
        {!simulationProp?.income ? (
          <div className="income-input">
            <label>Nombre simulacion</label>
            <input
              ref={simulationNameRef}
              className={`simulation-input ${
                !error.isError ? "sim-input-ok" : "sim-input-error"
              }`}
              type="text"
            />
            <label>¿Cual es tu ingreso esperado?</label>
            <input
              ref={incomeRef}
              defaultValue={0}
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
            <button className="sim-submit-btn" onClick={handleIncomeUpdate}>
              Confirmar
            </button>
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
            <div className="error-container">
              {error.isError ? <p>{error.errorMessage}</p> : null}
            </div>

            <div className="sim-table-container">
              <table className="sim-expenses-list">
                <thead>
                  {simulationProp?.expenses?.length > 0 ? (
                    <tr>
                      <th onClick={() => sortTable("category")}>Categoria</th>
                      <th onClick={() => sortTable("name")}>Nombre</th>
                      <th onClick={() => sortTable("amount")}>Monto</th>
                    </tr>
                  ) : null}
                </thead>
                <tbody>
                  {simulationProp.expenses.map((expense, index) => (
                    <tr key={index}>
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
                </tbody>
              </table>
            </div>
            <div className="sim-creation-btn-container">
              <button onClick={handleExpensesUpdate}> Agregar </button>
              <button onClick={confirmSimulation}>Confirmar</button>
              <button onClick={deleteSelectedSim}>Eliminar simulacion</button>
            </div>
          </div>
        )}
        <ModalEdition editionState={editionMode} closeModal={closeModal} />
      </div>
      <div className="back-icon-container" onClick={() => exitEditMode(false)}>
        <WestIcon fontSize="large" />
        <p>Volver...</p>
      </div>
    </div>
  );
};

export default SimulationCreation;
