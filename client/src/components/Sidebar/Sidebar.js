import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import Icon from "@material-ui/core/Icon";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import styles from "assets/jss/material-dashboard-react/components/sidebarStyle.js";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles(styles);

export default function Sidebar(props) {
  const classes = useStyles();

  function activeRoute(routeName) {
    return window.location.href.indexOf(routeName) > -1 ? true : false;
  }
  const { routes } = props;
  var links = (
    <List className={classes.list}>
      {routes.map((prop, key) => {
        const listItemClasses = classNames({
          [" " + classes["red"]]: activeRoute(prop.layout + prop.path),
        });

        return (
          <NavLink
            to={prop.layout + prop.path}
            className={classes.item}
            activeClassName="active"
            key={key}
          >
            <ListItem button className={classes.itemLink + listItemClasses}>
              {typeof prop.icon === "string" ? (
                <Icon className={classes.itemIcon}>{prop.icon}</Icon>
              ) : (
                <prop.icon className={classes.itemIcon} />
              )}
              <ListItemText
                primary={prop.name}
                className={classes.itemText}
                disableTypography={true}
              />
            </ListItem>
          </NavLink>
        );
      })}
    </List>
  );
  var brand = (
    <div className={classes.logo}>
      <div className={classes.logoLink} target="_blank">
        <div className={classes.logoImage}>
          <Brightness7Icon style={{ fontSize: "3rem" }} />
        </div>
      </div>
    </div>
  );
  return (
    <div>
      <Hidden xlDown implementation="css">
        <Drawer
          variant="temporary"
          anchor="right"
          open={props.open}
          className={classes.drawerPaper}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>{links}</div>
          <div
            className={classes.background}
            style={{ backgroundColor: "#fff" }}
          />
        </Drawer>
      </Hidden>
      {/* <Hidden lgDown implementation="css">
        <Drawer
          anchor="left"
          variant="permanent"
          open
          classes={{
            paper: classNames(classes.drawerPaper),
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>{links}</div>
          <div
            className={classes.background}
            style={{ backgroundColor: "#fff" }}
          />
        </Drawer>
      </Hidden> */}
    </div>
  );
}

Sidebar.propTypes = {
  handleDrawerToggle: PropTypes.func,
  logo: PropTypes.string,
  image: PropTypes.string,
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  open: PropTypes.bool,
};
