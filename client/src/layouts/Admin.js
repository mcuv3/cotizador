import React, { useEffect } from "react";
import routes from "../routes/admin";
import WrapperLyOut from "./WrapperLayout";
import { Switch, Route, Redirect } from "react-router-dom";
import DashBoard from "views/Dashboard/Dashboard";
import Calculation from "views/Calculation/Calculation";
import { useStore } from "store/index";

const Home = () => {
  const dispatch = useStore()[1];

  useEffect(() => {
    dispatch("GET_COMPONENTS");
  }, [dispatch]);

  return (
    <WrapperLyOut routes={routes}>
      <Switch>
        {routes.map((prop, key) => {
          if (prop.layout === "/admin") {
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
        <Route path="/admin/cotizacion/:status/:id" component={DashBoard} />
        <Route path="/admin/calculo/:id" component={Calculation} />
        <Redirect from="/admin" to="/admin/cotizaciones" />
      </Switch>
    </WrapperLyOut>
  );
};

export default Home;
