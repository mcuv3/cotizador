import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import configureAuth from "./store/authReducer";
import configureQuotationReducer from "./store/quotationReducer";
import configureComponents from "./store/componentsReducer";
import configureDashboard from "./store/dashboardReducer";
import { BrowserRouter } from "react-router-dom";
import "assets/css/material-dashboard-react.css?v=1.9.0";

configureAuth();
configureQuotationReducer();
configureComponents();
configureDashboard();

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
