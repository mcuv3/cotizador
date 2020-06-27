import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";

const LogOut = (props) => {
  useEffect(() => {
    // Eliminar credenciales
  });
  return <Redirect to="/home/cotizador" />;
};

export default LogOut;
