import Card from "@material-ui/core/Card";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import axios from "axios-instance";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter";
import CardHeader from "components/Card/CardHeader.js";
import Consumptions from "components/ConsumptionTable/ConsumptionTable";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import React, { useEffect, useState } from "react";
import ChartistGraph from "react-chartist";
import { withRouter } from "react-router-dom";
import { useStore } from "store/index";
import { emailsSubscriptionChart } from "variables/charts.js";
import Inputs from "./Inputs/Inputs";
import Results from "./Results/Results";
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
const getHighest = (consumptionsData) => {
  const { series } = formatDataToChart(consumptionsData);
  const highest = series[0].sort((a, b) => b - a);
  return highest[0] + 300;
};
function Calculation(props) {
  const classes = useStyles();
  const state = useStore()[0];
  const [calculationResults, setCalculationResults] = useState({
    daily_generation: 0,
    calc_panel: 0,
    daily_source_generation: 0,
    required_source: 0,
    generation_percentage: 0,
  });
  const [loading, setLoading] = useState(true);
  const [consumptions, setConsumptions] = useState({
    columns: [
      {
        title: "Consumo Kw/h",
        field: "kw",
        type: "numeric",
        initialEditValue: 50,
        validate: (rowData) => rowData.kw > 49,
      },
      {
        title: "Costo Bimestral ($)",
        field: "cost",
        type: "numeric",
        initialEditValue: 50,
        validate: (rowData) => rowData.cost > 49,
      },
      {
        title: "Medidor",
        field: "num_measure",
        editable: "onAdd",
        type: "numeric",
        initialEditValue: 1,
        validate: (rowData) => rowData.num_measure > 0,
      },
    ],
    data: [],
  });

  useEffect(() => {
    (async () => {
      try {
        const quotationId = props.match.params.id;
        const res = await axios.get(`consumption/${quotationId}`);
        setConsumptions((prevState) => {
          return {
            ...prevState,
            data: res.data.consumptions.map((c) => {
              return {
                ...c,
                edited: true,
              };
            }),
          };
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [props.match.params.id]);

  const updateConsumptionsHandler = async (c) => {
    const tableData = [
      ...consumptions.data.map((i) => {
        return { ...i };
      }),
    ];
    const newConsumptions = tableData.map((cs) => {
      delete cs.tableData;
      delete cs.edited;
      return cs;
    });

    setLoading(true);
    try {
      await axios.put(`consumption/edit/${props.match.params.id}`, {
        consumptions: newConsumptions,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getCalculationsHandler = async (panel, num_panel) => {
    setLoading(true);
    try {
      const res = await axios.post("calculation/consumptions", {
        quotationId: props.match.params.id,
        panel: state.components.solar_panel[panel].watts,
        num_panel,
      });
      setCalculationResults(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={6}>
        {loading && (
          <div className={classes.loadingForm}>
            <CircularProgress color="secondary" />
          </div>
        )}
        <Card className={classes.fullHeight}>
          <CardHeader color="success">
            <ChartistGraph
              className="ct-chart"
              data={formatDataToChart(consumptions.data)}
              type="Bar"
              options={{
                ...emailsSubscriptionChart.options,
                high: getHighest(consumptions.data),
              }}
              listener={emailsSubscriptionChart.animation}
            />
          </CardHeader>
          <CardBody>
            <h4 className={classes.cardTitle}>Consumos Bimestrales</h4>
          </CardBody>
          <CardFooter>
            <p className={classes.cardCategory}>kw</p>
          </CardFooter>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={6}>
        <Results calculationResults={calculationResults} />
      </GridItem>
      <GridItem xs={12} sm={6} md={6}>
        <Consumptions
          consumptions={consumptions}
          setConsumptions={setConsumptions}
          updateConsumptions={updateConsumptionsHandler}
          updatable
        />
      </GridItem>
      <GridItem xs={12} sm={6} md={6}>
        <Inputs
          solar_panels={state.components.solar_panel}
          getCalculations={getCalculationsHandler}
          quotationId={props.match.params.id}
          role={state.auth.role}
        />
      </GridItem>
    </GridContainer>
  );
}

export default withRouter(Calculation);
