import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Admin from "layouts/Admin.js";
import Seller from "layouts/Seller.js";
import Home from "./layouts/Home";
import { useStore } from "./store/index";
import { withRouter } from "react-router-dom";

const App = (props) => {
  const [state, dispatch] = useStore();

  useEffect(() => {
    dispatch("CHECK_CREDENTIALS", { dispatch });
    if (!state.auth.token) props.history.push({ pathname: "/home/cotizador" });
  }, [dispatch, props.history, state.auth.token]);

  let routes;
  switch (state.auth.role) {
    case "admin":
      routes = (
        <>
          <Route path="/admin" component={Admin} />
          <Redirect to="/admin/dashboard" />
        </>
      );
      break;
    case "seller":
      routes = (
        <>
          <Route path="/seller" component={Seller} />
          <Redirect to="/seller/cotizaciones" />
        </>
      );
      break;
    default:
      routes = (
        <>
          <Route path="/home" component={Home} />
          <Redirect to="/home/cotizador" />
        </>
      );
  }

  return <Switch>{routes}</Switch>;
};

export default withRouter(App);
