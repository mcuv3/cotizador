import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";
import Footer from "components/Footer/Footer.js";
import Navbar from "components/Navbars/Navbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import React from "react";

let ps;

const useStyles = makeStyles(styles);

export default function Admin({ ...props }) {
  const classes = useStyles();
  const mainPanel = React.createRef();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };

  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);
    return () => {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [mainPanel]);
  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={props.routes}
        logoText="Cotizador"
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        {...props}
      />
      <div className={classes.mainPanel} ref={mainPanel}>
        <Navbar
          routes={props.routes}
          handleDrawerToggle={handleDrawerToggle}
          {...props}
        />
        <div className={classes.content}>
          <div className={classes.container}>{props.children}</div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
