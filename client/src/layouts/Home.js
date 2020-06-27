import React from "react";
import routes from "../routes/home";
import WrapperLyOut from "./WrapperLayout";
import { Switch, Route, Redirect } from "react-router-dom";

const Home = () => {
  return (
    <WrapperLyOut routes={routes}>
      <Switch>
        {routes.map((prop, key) => {
          if (prop.layout === "/home") {
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
        <Redirect to="/home/cotizador" />
      </Switch>
    </WrapperLyOut>
  );
};

export default Home;
