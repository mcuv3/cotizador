import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useStore } from "../../store/index";

const LogOut = (props) => {
  const dispatch = useStore()[1];
  useEffect(() => {
    dispatch("LOG_OUT");
  });
  return <Redirect to="/home/cotizador" />;
};

export default LogOut;
