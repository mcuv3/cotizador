import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import ExitToAppTwoToneIcon from "@material-ui/icons/ExitToAppTwoTone";

import AddCircleIcon from "@material-ui/icons/AddCircle";
import SettingsIcon from "@material-ui/icons/Settings";
import AdminQuotations from "views/AdminQuotations/AdminQuotations";
import AddQuotation from "views/AddQuotation/AddQuotation";
import AddSeller from "views/AddSeller/AddSeller";
import LogOut from "views/LogOut/LogOut.js";
import Settings from "views/Settings/Settings";

const dashboardRoutes = [
  {
    path: "/cotizaciones",
    name: "Cotizaciones",
    icon: Dashboard,
    component: AdminQuotations,
    layout: "/admin",
  },
  {
    path: "/configuraciones",
    name: "Configuraciones",
    icon: SettingsIcon,
    component: Settings,
    layout: "/admin",
  },
  {
    path: "/agregar",
    name: "Agregar Cotización",
    icon: AddCircleIcon,
    component: AddQuotation,
    layout: "/admin",
  },
  {
    path: "/vendedor",
    name: "Agregar Vendedor",
    icon: Person,
    component: AddSeller,
    layout: "/admin",
  },
  {
    path: "/logout",
    name: "Salir",
    icon: ExitToAppTwoToneIcon,
    component: LogOut,
    layout: "/admin",
  },
];

export default dashboardRoutes;
