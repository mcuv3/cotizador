import FingerprintTwoToneIcon from "@material-ui/icons/FingerprintTwoTone";
import BatteryChargingFullTwoToneIcon from "@material-ui/icons/BatteryChargingFullTwoTone";

import Cotizador from "views/Quotation/index";
import LogIn from "views/LogIn/LogIn";

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
];

export default dashboardRoutes;
