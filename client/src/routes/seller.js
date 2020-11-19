import ExitToAppTwoToneIcon from "@material-ui/icons/ExitToAppTwoTone";
import BatteryChargingFullTwoToneIcon from "@material-ui/icons/BatteryChargingFullTwoTone";
import Quotations from "views/AdminQuotations/AdminQuotations";
import LogOut from "views/LogOut/LogOut";
//Cotizaciones component

const dashboardRoutes = [
  {
    path: "/cotizaciones",
    name: "Cotizaciones",
    icon: BatteryChargingFullTwoToneIcon,
    component: Quotations,
    layout: "/seller",
  },
  {
    path: "/logout",
    name: "Salir",
    icon: ExitToAppTwoToneIcon,
    component: LogOut,
    layout: "/seller",
  },
];

export default dashboardRoutes;
