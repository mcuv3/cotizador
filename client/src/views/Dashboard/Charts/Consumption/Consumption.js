import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import React from "react";

const useStyles = makeStyles(styles);

export default function Consumption({ formateadData }) {
  const classes = useStyles();
  return (
    <Card className={classes.fullWidth}>
      <TableContainer>
        <Table size="small" aria-label="custom pagination table">
          <TableHead className={classes.success}>
            <TableRow>
              <TableCell align="center">Bimestre</TableCell>
              <TableCell align="center">Kwh</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {formateadData.labels.map((bimester, index) => (
              <TableRow key={index}>
                <TableCell component="th" align="center" scope="row">
                  {bimester}
                </TableCell>
                <TableCell component="th" align="center" scope="row">
                  {formateadData.series[0][index]}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}
