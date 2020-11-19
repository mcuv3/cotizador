import {
  successColor,
  dangerColor,
  infoColor,
  warningColor,
} from "assets/jss/material-dashboard-react.js";

const settingsStyles = {
  settings: {
    margin: "0.2rem 0",
  },
  success: {
    backgroundColor: successColor[0],
  },
  danger: {
    backgroundColor: dangerColor[0],
  },
  grey: {
    backgroundColor: "#ccc",
  },
  info: {
    backgroundColor: infoColor[0],
  },
  warning: {
    backgroundColor: warningColor[0],
  },
  form: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0.5rem",
  },
  formItem: {
    margin: "0 0.5rem",
  },
  root: {
    "& > *": {
      margin: "0 0.5rem",
      width: "25ch",
    },
  },
  formContainer: {
    position: "relative",
  },
  loadingForm: {
    zIndex: 20,
    width: "100%",
    height: "100%",
    position: "absolute",
    top: "0",
    left: "0",
    backgroundColor: "#ccc",
    opacity: "0.4",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  centered: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default settingsStyles;
