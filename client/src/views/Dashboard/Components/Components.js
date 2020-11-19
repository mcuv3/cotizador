import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import CoreComp from "./CoreComp/CoreComp";
import ConstantComp from "./ConstantComp/ConstantComp";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import WbIncandescentIcon from "@material-ui/icons/WbIncandescent";
import PanToolIcon from "@material-ui/icons/PanTool";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import Button from "components/CustomButtons/Button";
import { Link } from "react-router-dom";
import { useStore } from "store/index";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withRouter } from "react-router-dom";
const useStyles = makeStyles(styles);

const Dashboard = ({ quotationId, ...props }) => {
  const classes = useStyles();
  const [state, dispatch] = useStore();
  const comp_gain_factor = state.components.constant.find((c) => c.id === 2);

  if (state.dashboard.quotation_sent) {
    setTimeout(() => {
      props.history.push(`/${state.auth.role}/cotizaciones}`);
    }, 0);
  }

  return (
    <>
      <div style={{ position: "absolute", top: "3rem", right: "3.5rem" }}>
        {state.dashboard.quotation_number && (
          <Button
            color="warning"
            onClick={() => {
              dispatch("START_LOADING");
              dispatch("DOWNLOAD_QUOTATION");
            }}
          >
            Descargar Cotización
          </Button>
        )}

        <Link to={`/${state.auth.role}/calculo/${quotationId}`}>
          <Button color="info">Ir a la Cálculo</Button>
        </Link>
      </div>

      {state.loading ? (
        <div className={classes.loadingForm}>
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <>
          <GridItem xs={12} sm={12} md={8}>
            <CustomTabs
              title="Componentes:"
              headerColor="danger"
              tabs={[
                {
                  tabName: "Panel / Inversor / Montaje",
                  tabIcon: WbIncandescentIcon,
                  tabContent: (
                    <CoreComp
                      inversor={state.components.inversor}
                      quotation_inversor={state.dashboard.components.inversor}
                      solar_panel={state.components.solar_panel}
                      quotation_panel={state.dashboard.components.solar_panel}
                      mounting_system={state.components.mounting_system}
                      quotation_mounting={
                        state.dashboard.components.mounting_system
                      }
                      comp_gain_factor={comp_gain_factor}
                    />
                  ),
                },
                {
                  tabName: "Tornilleria / Instalación / Mano Obra",
                  tabIcon: PanToolIcon,
                  tabContent: (
                    <ConstantComp
                      component_constant={state.components.component_constant}
                      quotation_constant={
                        state.dashboard.components.component_constant
                      }
                      work_force={state.dashboard.work_force}
                      comp_gain_factor={comp_gain_factor}
                    />
                  ),
                },
              ]}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card>
              <CardHeader color="warning">
                <h4 className={classes.cardTitleWhite}>Configuraciones</h4>
                <p className={classes.cardCategoryWhite}>
                  Capacidades máximas y mínimas
                </p>
              </CardHeader>
              <CardBody>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Cap máx del Inversor (KW)</TableCell>
                      <TableCell>Cap min del Inversor (KW)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        {state.dashboard.configurations.MAX_INVERSOR}
                      </TableCell>
                      <TableCell>
                        {state.dashboard.configurations.MIN_INVERSOR}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Máximo de Paneles</TableCell>
                      <TableCell>Mínimo de Paneles</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        {state.dashboard.configurations.MAX_PANEL}
                      </TableCell>
                      <TableCell>
                        {state.dashboard.configurations.MIN_PANEL}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardBody>
            </Card>
          </GridItem>
        </>
      )}
    </>
  );
};

export default withRouter(Dashboard);
