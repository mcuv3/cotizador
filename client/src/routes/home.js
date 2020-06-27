/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons

import Person from "@material-ui/icons/Person";
import FingerprintTwoToneIcon from "@material-ui/icons/FingerprintTwoTone";
import BatteryChargingFullTwoToneIcon from "@material-ui/icons/BatteryChargingFullTwoTone";

// core components/views for Admin layout

import Cotizador from "views/Cotizador/index";
import LogIn from "views/LogIn/LogIn";
import SignUp from "views/SignUp/SignUp";

// core components/views for RTL layout

const dashboardRoutes = [
  {
    path: "/cotizador",
    name: "Cotizador",
    icon: BatteryChargingFullTwoToneIcon,
    component: Cotizador,
    layout: "/home",
  },
  {
    path: "/LogIn",
    name: "Iniciar Sesion",
    icon: FingerprintTwoToneIcon,
    component: LogIn,
    layout: "/home",
  },
  {
    path: "/SignUp",
    name: "Registrarse",
    icon: Person,
    component: SignUp,
    layout: "/home",
  },
];

export default dashboardRoutes;
