import {
  successColor,
  whiteColor,
  grayColor,
  warningColor,
  dangerColor,
  infoColor,
  successCardHeader,
  infoCardHeader,
  dangerCardHeader,
  warningCardHeader,
  hexToRgb,
} from "assets/jss/material-dashboard-react.js";

const dashboardStyle = {
  successText: {
    color: successColor[0],
  },
  success: {
    ...successCardHeader,
  },
  infoText: {
    color: infoColor[0],
  },
  warningText: {
    color: warningColor[0],
  },
  dangerText: {
    color: dangerColor[0],
  },
  infoColor: {
    ...infoCardHeader,
  },
  warningBg: {
    ...warningCardHeader,
  },
  dangerBg: {
    ...dangerCardHeader,
  },
  mainList: {
    width: "50%",
    margin: "auto",
  },
  upArrowCardCategory: {
    width: "16px",
    height: "16px",
  },
  inputCalculation: {
    marginTop: "1rem !important",
  },
  stats: {
    color: grayColor[0],
    display: "inline-flex",
    fontSize: "12px",
    lineHeight: "22px",
    "& svg": {
      top: "4px",
      width: "16px",
      height: "16px",
      position: "relative",
      marginRight: "3px",
      marginLeft: "3px",
    },
    "& .fab,& .fas,& .far,& .fal,& .material-icons": {
      top: "4px",
      fontSize: "16px",
      position: "relative",
      marginRight: "3px",
      marginLeft: "3px",
    },
  },
  cardCategory: {
    color: grayColor[0],
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    paddingTop: "10px",
    marginBottom: "0",
  },
  cardCategoryWhite: {
    color: "rgba(" + hexToRgb(whiteColor) + ",.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitle: {
    color: grayColor[2],
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: grayColor[1],
      fontWeight: "400",
      lineHeight: "1",
    },
  },
  cardTitleWhite: {
    color: whiteColor,
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: grayColor[1],
      fontWeight: "400",
      lineHeight: "1",
    },
  },
  hover: {
    background: "#fff",
    "&:hover": {
      background: "rgba(0, 0, 0, 0.04)",
      cursor: "pointer",
    },
  },
  headDashBoard: {
    height: "80%",
    paddingTop: 5,
    backgroundColor: "#fff",
  },
  fullHeight: {
    height: "80%",
    paddingTop: 5,
    backgroundColor: "#fff",
  },
  fullWidth: {
    width: "97%",
  },
  detailsChart: {
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  item: {
    width: "100%",
    marginBottom: "0.5rem",
  },
  addUserQuotationContainer: {
    height: "50rem",
  },
  addUserQuotation: {
    display: "flex",
    height: "100%",
    marginTop: "0px !important",
    boxSizing: "border-box",
    padding: "1rem",
  },
  userData: {
    marginTop: "0px",
    flex: 1,
  },
  loadingForm: {
    zIndex: 20,
    width: "100%",
    height: "100vh",
    position: "fixed",
    top: "0",
    right: "0",
    backgroundColor: "#ccc",
    opacity: "0.4",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default dashboardStyle;
