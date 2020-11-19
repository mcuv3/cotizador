import React from "react";
import routes from "../routes/seller";
import WrapperLyOut from "./WrapperLayout";
import { Switch, Route, Redirect } from "react-router-dom";
import DashBoard from "views/Dashboard/Dashboard";
import Calculation from "views/Calculation/Calculation";

const Home = () => {
  return (
    <WrapperLyOut routes={routes}>
      <Switch>
        {routes.map((prop, key) => {
          if (prop.layout === "/seller") {
            return (
              <Route
                path={prop.layout + prop.path}
                component={prop.component}
                key={key}
              />
            );
          }
          return null;
        })}
        <Route path="/seller/cotizacion/:status/:id" component={DashBoard} />
        <Route path="/seller/calculo/:id" component={Calculation} />
        <Redirect from="/seller" to="/seller/cotizaciones" />
      </Switch>
    </WrapperLyOut>
  );
};

export default Home;
