import React from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import Card from "@material-ui/core/Card";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import ComponentItem from "../ComponentItem";
import { INVERSOR, SOLAR_PANEL, MOUNTING_SYSTEM } from "store/dashboardReducer";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
const useStyles = makeStyles(styles);
export default function CoreComp({
  inversor,
  quotation_inversor,
  solar_panel,
  quotation_panel,
  mounting_system,
  quotation_mounting,
  comp_gain_factor,
}) {
  const classes = useStyles();

  return (
    <Card className={classes.fullHeight}>
      <TableContainer component={Paper}>
        <Table aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell>Cantidad</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell align="right">C/U</TableCell>
              <TableCell align="right">Precio</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <ComponentItem
              key={1}
              initialQty={quotation_inversor.qty}
              kind={INVERSOR}
              component={{
                label: "Inversor",
                components: inversor,
                initialComponent: inversor.find(
                  (comp) => comp.id === quotation_inversor.component_id
                ),
              }}
              isConstant={false}
              comp_gain_factor={comp_gain_factor}
            />
            <ComponentItem
              key={2}
              kind={SOLAR_PANEL}
              initialQty={quotation_panel.qty}
              component={{
                label: "Panel Solar",
                components: solar_panel,
                initialComponent: solar_panel.find(
                  (comp) => comp.id === quotation_panel.component_id
                ),
              }}
              isConstant={false}
              comp_gain_factor={comp_gain_factor}
            />

            {quotation_mounting.map((e, index) => {
              return (
                <ComponentItem
                  key={index + 3}
                  initialQty={quotation_mounting[index].qty}
                  index={index}
                  kind={MOUNTING_SYSTEM}
                  mounting_num={index}
                  component={{
                    label: "Sistema de Montaje",
                    components: mounting_system,
                    initialComponent: mounting_system.find(
                      (comp) =>
                        comp.id === quotation_mounting[index].component_id
                    ),
                  }}
                  comp_gain_factor={comp_gain_factor}
                  isConstant={false}
                  mounting_system={index === 0 ? false : true}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}
