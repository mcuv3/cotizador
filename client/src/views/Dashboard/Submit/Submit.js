import React from "react";
import Button from "components/CustomButtons/Button";
import { useStore } from "store/index";

const Submit = () => {
  const dispatch = useStore(false)[1];
  return (
    <Button
      fullWidth
      color="success"
      onClick={() => {
        dispatch("START_LOADING");
        dispatch("SEND_QUOTATION");
      }}
    >
      Enviar Cotización
    </Button>
  );
};

export default Submit;
