import React from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ComponentItem from "../ComponentItem";
import { COMPONENT_CONSTANT } from "store/dashboardReducer";

export default function CoreComp({
  component_constant,
  work_force,
  comp_gain_factor,
  quotation_constant,
}) {
  return (
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
          {component_constant.map((comp, index) => {
            return (
              <ComponentItem
                key={index}
                index={index}
                kind={COMPONENT_CONSTANT}
                initialQty={quotation_constant[index].qty}
                component={{ label: "CONSTANT_COMPONENT", components: [comp] }}
                comp_gain_factor={comp_gain_factor}
                isConstant
              />
            );
          })}

          <ComponentItem
            key={3}
            initialQty={1}
            component={{
              label: "Mano de Obra",
              components: [
                {
                  percentage: work_force.percentage,
                  cost: work_force.total,
                  description: "Mano de Obra",
                },
              ],
            }}
            isConstant
            workforce
          />
        </TableBody>
      </Table>
    </TableContainer>
  );
}
