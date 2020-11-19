import { Typography } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Button from "components/CustomButtons/Button";
import React from "react";
import { useStore } from "store/index";
import { useStyles } from "./indexStyles/style";

const EmailSent = () => {
  const classes = useStyles();
  const dispatch = useStore(false)[1];
  return (
    <div className={classes.success}>
      <CheckCircleIcon className={classes.successIcon} />
      <Typography variant="h3" gutterBottom>
        La cotización ha sido enviada a su correo.
      </Typography>
      <Button
        onClick={() => dispatch("RESET_STEPS")}
        variant="contained"
        className={classes.button}
      >
        Regresar
      </Button>
    </div>
  );
};

export default EmailSent;
