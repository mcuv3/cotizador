import { TableContainer, TableHead } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import Card from "components/Card/Card.js";
import CardFooter from "components/Card/CardFooter.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import React from "react";
import { useStore } from "store/index";
import {format} from '../../../util/formater'

const toFloat = (number)=>typeof number === "string" ? +number.replace("$",""):number

const useStyles = makeStyles(styles);
export default function Pricing() {
  const state = useStore()[0];
  const classes = useStyles();
  return (
    <Card className={classes.headDashBoard}>
      <CardHeader color="success" stats icon>
        <CardIcon color="success">
          <AttachMoneyIcon />
        </CardIcon>

        <p className={classes.cardCategory}>MXN</p>
        <h3 className={classes.cardTitle}>{format.format(toFloat(state.dashboard.total))}</h3>
      </CardHeader>
      <CardFooter>
        <TableContainer>
          <Table aria-label="spanning table" size="small">
            <TableHead>
              <TableRow>
                <TableCell align="center">Cantidad</TableCell>
                <TableCell align="center">Concepto</TableCell>
                <TableCell align="center">Costo Unitario</TableCell>
                <TableCell align="center">SubTotal</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center">{state.dashboard.qty}</TableCell>
                <TableCell align="center">
                  Cotización de Paneles Solares
                </TableCell>
                <TableCell align="center">{format.format(state.dashboard.total)}</TableCell>
                <TableCell align="center">
                  {format.format(toFloat(state.dashboard.sub_total))}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell colSpan={2} />
                <TableCell>
                  <strong>Subtotal </strong>
                </TableCell>
                <TableCell align="center">
                  {format.format(toFloat(state.dashboard.sub_total))}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2} />
                <TableCell>
                  <strong>IVA ({state.dashboard.percentage_iva})</strong>
                </TableCell>
                <TableCell align="center">{format.format(toFloat(state.dashboard.iva))}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2} />
                <TableCell>
                  <strong>Total </strong>
                </TableCell>
                <TableCell align="center">{format.format(toFloat(state.dashboard.total))}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </CardFooter>
    </Card>
  );
}
