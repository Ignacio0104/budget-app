import { Popover, Typography } from "@mui/material";
import React from "react";
import "./HelpPopover.scss";

const messageListComponents = [
  <p className="help-text">
    Esta sección sirve para que uno ingrese las gastos que va realizando mes a
    mes y de esa forma tener un control de los mismos. Simplemente se debe
    elegir el mes, el año e ingresar los datos en el formulario inferior.
    <br />
    <br />
    Para eliminar un registro, es necesario seleccionar el modo Lista
  </p>,
  <p className="help-text">
    Esta sección tiene el fin de plasmar los objetivos que uno tiene y de ese
    modo hacer el seguimiento de los mismos.
    <br />
    <br />
    Por ejemplo, si el objetivo es juntar $300000 para una computadora, se crea
    el objetivo con foto de la computadora y monto. Luego, cada vez que logremos
    juntar dinero en pos de ese objetivo, se carga aquí y la barra de progreso
    se actualiza automáticamente.
  </p>,
  <p className="help-text">
    La simulación tiene por objetivo ayudarnos a planificar un período
    determinado. <br />
    <br />
    Nosotros le damos un nombre como puede ser 'Septiembre 2023' o 'Vacaciones
    2023' y luego ingresamos el monto de dinero que esperamos disponer durante
    ese período. A continuación, pasamos a la sección de gastos, donde elegimos
    la categoría del mismo, junto con su nombre y monto. <br />
    <br />
    De esta forma cargamos todos los gastos que esperamos tener para dicho
    período. Una vez terminado, el sistema hará los calculos para mostrar el
    porcentaje que ocupa cada categoría en nuestro presupuesto final, con
    desglose detallado, como así también, distintos tipos de gráficos para
    visualizar la información
  </p>,
];

const HelpPopover = ({ open, handleClose, anchor, message }) => {
  return (
    <Popover
      id="simple-popover"
      open={open}
      anchorEl={anchor}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <Typography sx={{ p: 2 }}>{messageListComponents[message]}</Typography>
    </Popover>
  );
};

export default HelpPopover;
