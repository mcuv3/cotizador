import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { Paper, Avatar } from "@material-ui/core";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import EvStationIcon from "@material-ui/icons/EvStation";
import BatteryChargingFullIcon from "@material-ui/icons/BatteryChargingFull";
import AirplayIcon from "@material-ui/icons/Airplay";
import EcoIcon from "@material-ui/icons/Eco";
const useStyles = makeStyles(styles);

export default function Results(props) {
  const classes = useStyles();
  const {
    daily_generation,
    calc_panel,
    daily_source_generation,
    required_source,
    generation_percentage,
  } = props.calculationResults;
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={6}>
        <Paper elevation={2} className={classes.item}>
          <ListItem>
            <ListItemAvatar>
              <Avatar className={classes.infoColor}>
                <BatteryChargingFullIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Generación Diaria Requerida"
              secondary={`${daily_generation}kw`}
            />
          </ListItem>
        </Paper>
      </GridItem>
      <GridItem xs={12} sm={12} md={6}>
        <Paper elevation={2} className={classes.item}>
          <ListItem>
            <ListItemAvatar>
              <Avatar className={classes.warningBg}>
                <EvStationIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Fuente Requerida"
              secondary={`${required_source} kw`}
            />
          </ListItem>
        </Paper>
      </GridItem>
      <GridItem xs={12} sm={12} md={6}>
        <Paper elevation={2} className={classes.item}>
          <ListItem>
            <ListItemAvatar>
              <Avatar className={classes.infoColor}>
                <AirplayIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Paneles Calculados"
              secondary={`${calc_panel}`}
            />
          </ListItem>
        </Paper>
      </GridItem>
      <GridItem xs={12} sm={12} md={6}>
        <Paper elevation={2} className={classes.item}>
          <ListItem>
            <ListItemAvatar>
              <Avatar className={classes.warningBg}>
                <Brightness7Icon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Fuente Generación Diaria"
              secondary={`${daily_source_generation}`}
            />
          </ListItem>
        </Paper>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Paper elevation={2} className={classes.item + classes.mainList}>
          <ListItem>
            <ListItemAvatar>
              <Avatar className={classes.dangerBg}>
                <EcoIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Porcentaje de Generación"
              secondary={`${generation_percentage}%`}
            />
          </ListItem>
        </Paper>
      </GridItem>
    </GridContainer>
  );
}
