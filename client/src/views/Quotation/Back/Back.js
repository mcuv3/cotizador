import React from "react";
import { useStyles } from "../indexStyles/style";
import { Button } from "@material-ui/core";
import { useStore } from "../../../store/index";

const Back = (props) => {
  const classes = useStyles();
  const dispatch = useStore()[1];
  return (
    <Button
      disabled={props.disabled}
      className={classes.back}
      onClick={() => dispatch("BACK")}
    >
      Atras
    </Button>
  );
};

export default Back;
