import React from "react";
import { Typography } from "@material-ui/core";
import { useStyles } from "./indexStyles/style";
import WarningIcon from "@material-ui/icons/Warning";

const Result = () => {
  const classes = useStyles();
  return (
    <div className={classes.success}>
      <WarningIcon className={classes.successIcon} />
      <Typography variant="h4" gutterBottom>
        Ocurrió un Error
        <span aria-label="sad" role="img">
          😢
        </span>
        Vuelve a intentarlo porfavor
        <span aria-label="happy" role="img">
          😄
        </span>
        .
      </Typography>
    </div>
  );
};

export default Result;
