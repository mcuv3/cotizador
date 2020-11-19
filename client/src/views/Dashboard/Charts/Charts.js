import React from "react";
import ChartistGraph from "react-chartist";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import GridItem from "components/Grid/GridItem.js";
import Typography from "@material-ui/core/Typography";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Consumption from "./Consumption/Consumption";
import CFE from "./Consumption/CFE";
import { useStore } from "store/index";
//import { formatDataToChart } from "util/chart";
import { emailsSubscriptionChart, pieChart } from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
const useStyles = makeStyles(styles);
const formatDataToChart = (consumptionsData) => {
  const data = [0, 0, 0, 0, 0, 0];

  for (let i of consumptionsData) {
    const indexGroup = i.bimester - 1;
    data[indexGroup] = data[indexGroup] + i.kw;
  }
  const chartValues = {
    labels: [
      "Bimestre 1",
      "Bimestre 2",
      "Bimestre 3",
      "Bimestre 4",
      "Bimestre 5",
      "Bimestre 6",
    ],
    series: [data],
  };

  return chartValues;
};
export default function Charts() {
  const classes = useStyles();
  const state = useStore()[0];

  const formateadData = formatDataToChart(state.dashboard.consumptions);

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={6}>
        <Card chart>
          <CardHeader color="success">
            <ChartistGraph
              className="ct-chart"
              data={formateadData}
              type="Bar"
              options={emailsSubscriptionChart.options}
              listener={emailsSubscriptionChart.animation}
              style={{
                height: "15rem",
              }}
            />
          </CardHeader>
          <CardBody>
            <h4 className={classes.cardTitle}>Histórico de Consumos</h4>
            <p className={classes.cardCategory}>
              Basado en recibos de luz del cliente
            </p>
          </CardBody>
          <CardFooter className={classes.fullWidth}>
            <ExpansionPanel className={classes.fullWidth}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                className={classes.success}
              >
                <Typography as="h4">Mas detalles</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.fullWidth}>
                <Consumption formateadData={formateadData} />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </CardFooter>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={6}>
        <Card>
          <CardHeader color="warning">
            <ChartistGraph
              className="ct-chart"
              type="Pie"
              data={pieChart.data}
              options={pieChart.options}
              style={{
                height: "15rem",
              }}
            />
          </CardHeader>
          <CardBody>
            <h4 className={classes.cardTitle}>Generación de Energía</h4>
            <p className={classes.cardCategory}>Consumos SF y CFE</p>
          </CardBody>
          <CardFooter>
            <ExpansionPanel className={classes.fullWidth}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                className={classes.warningBg}
              >
                <Typography as="h4">Mas detalles</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.fullWidth}>
                <CFE />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </CardFooter>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
