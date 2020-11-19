import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { StepConnector, withStyles, TextField } from "@material-ui/core";
import Check from "@material-ui/icons/Check";
import clsx from "clsx";
import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

const useQontoStepIconStyles = makeStyles({
  root: {
    color: "#ccc",
    display: "flex",
    height: 22,
    alignItems: "center",
  },
  active: {
    color: "#f44336",
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
  completed: {
    color: "#f44336",
    zIndex: 1,
    fontSize: 18,
  },
});

export function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? (
        <Check className={classes.completed} />
      ) : (
        <div className={classes.circle} />
      )}
    </div>
  );
}

export const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  active: {
    "& $line": {
      borderColor: "#f44336",
    },
  },
  completed: {
    "& $line": {
      borderColor: "#f44336",
    },
  },
  line: {
    borderColor: "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);

export const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(650 + theme.spacing(2) * 2)]: {
      width: 650,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    // marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
    backgroundColor: "#f44336",
    color: "#fff",
  },
  completed: {
    backgroundColor: "#f44336",
    color: "#fff",
  },
  success: {
    textAlign: "center",
  },
  successIcon: {
    color: "#66bb6a",
    fontSize: "4rem",
  },
  back: {
    marginTop: theme.spacing(3),
    marginLeft: "auto",
    backgroundColor: "#f44336",
    color: "#fff",
  },
  full: {
    width: "100%",
  },
}));

export const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#f44336",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#f44336",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#f44336",
      },
      "&:hover fieldset": {
        borderColor: "#f44336",
      },
      "&.Mui-focused fieldset": {
        borderColor: "green",
      },
    },
  },
})(TextField);

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: red[400],
    },
    secondary: {
      main: "#000",
    },
  },
});
