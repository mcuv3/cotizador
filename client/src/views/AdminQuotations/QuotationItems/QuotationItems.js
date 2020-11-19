import React from "react";
import QuotationItem from "./QuotationItem/QuotationItem";
import { makeStyles } from "@material-ui/core/styles";
import TableRow from "@material-ui/core/TableRow";
import { TableCell, TableHead, TableBody, Table } from "@material-ui/core";
import styles from "assets/jss/material-dashboard-react/components/tasksStyle.js";

const useStyles = makeStyles(styles);

export default function QuotationItems(props) {
  const classes = useStyles();
  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell>{props.sent ? "Cotización" : "Cliente"}</TableCell>
          <TableCell>{props.role === "admin" && "Vendedor"}</TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          {!props.sent && props.role === "admin" ? (
            <>
              <TableCell align="center">Estatus</TableCell>
              <TableCell></TableCell>
            </>
          ) : null}
        </TableRow>
      </TableHead>
      <TableBody>
        {props.quotations.map((qto, index) => {
          return (
            <QuotationItem
              key={index}
              qto={qto}
              role={props.role}
              sellers={props.sellers}
              sent={props.sent}
              assign={(seller) => props.assign(seller, qto.quotation)}
              cancel={() => props.cancel(qto.quotation)}
              active={props.active}
            />
          );
        })}
      </TableBody>
    </Table>
  );
}
