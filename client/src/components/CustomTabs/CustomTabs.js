import React from "react";

// nodejs library to set properties for components
import PropTypes from "prop-types";

// material-ui components
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import styles from "assets/jss/material-dashboard-react/components/customTabsStyle.js";
import AddIcon from "@material-ui/icons/Add";
import SaveIcon from "@material-ui/icons/Save";
import { useStore } from "store/index";

const useStyles = makeStyles(styles);

export default function CustomTabs(props) {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, value) => {
    setValue(value);
  };
  const classes = useStyles();
  const dispatch = useStore(false)[1];
  const { headerColor, plainTabs, tabs, title } = props;

  return (
    <Card plain={plainTabs}>
      <CardHeader
        color={headerColor}
        plain={plainTabs}
        style={{ position: "relative" }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          classes={{
            root: classes.tabsRoot,
            indicator: classes.displayNone,
            scrollButtons: classes.displayNone,
          }}
          variant="scrollable"
          scrollButtons="auto"
        >
          {tabs.map((prop, key) => {
            var icon = {};
            if (prop.tabIcon) {
              icon = {
                icon: <prop.tabIcon />,
              };
            }
            return (
              <Tab
                classes={{
                  root: classes.tabRootButton,
                  selected: classes.tabSelected,
                  wrapper: classes.tabWrapper,
                }}
                key={key}
                label={prop.tabName}
                {...icon}
              />
            );
          })}
        </Tabs>
        {title !== undefined ? (
          <div className={classes.cardTitle}>
            <Tooltip title="Guardar Cambios">
              <IconButton
                onClick={() => {
                  dispatch("START_LOADING");
                  dispatch("GET_CALC__SAVE_COMP", { wantToSave: true });
                }}
              >
                <SaveIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Aplicar Cambios">
              <IconButton
                onClick={() => {
                  dispatch("START_LOADING");
                  dispatch("GET_CALC__SAVE_COMP");
                }}
              >
                <SaveAltIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Agregar sistema de montaje">
              <IconButton onClick={() => dispatch("ADD_MOUNTING")}>
                <AddIcon />
              </IconButton>
            </Tooltip>
          </div>
        ) : null}
      </CardHeader>
      <CardBody>
        {tabs.map((prop, key) => {
          if (key === value) {
            return <div key={key}>{prop.tabContent}</div>;
          }
          return null;
        })}
      </CardBody>
    </Card>
  );
}

CustomTabs.propTypes = {
  headerColor: PropTypes.oneOf([
    "warning",
    "success",
    "danger",
    "info",
    "primary",
    "rose",
  ]),
  title: PropTypes.string,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      tabName: PropTypes.string.isRequired,
      tabIcon: PropTypes.object,
      tabContent: PropTypes.node.isRequired,
    })
  ),
  rtlActive: PropTypes.bool,
  plainTabs: PropTypes.bool,
};
