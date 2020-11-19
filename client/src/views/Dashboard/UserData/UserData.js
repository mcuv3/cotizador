import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody";
import CardFooter from "components/Card/CardFooter.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import React from "react";
import { useStore } from "store/index";

const useStyles = makeStyles(styles);
export default function UserData() {
  const classes = useStyles();
  const [state, dispatch] = useStore();

  const isAdmin = state.auth.role === "admin";

  return (
    <Card className={classes.headDashBoard}>
      <CardHeader color="warning" stats icon>
        <CardIcon color="warning">
          <AccountCircleIcon />
        </CardIcon>
        <p className={classes.cardCategory}>
          Cotización No.
          {isAdmin
            ? state?.dashboard?.branchName?.slice(0, 3) || ""
            : state.auth?.branch?.slice(0, 3)}
          -{state.dashboard.quotation}-{state.dashboard?.quotation_number || ""}
        </p>
        <h3 className={classes.cardTitle}>
          <small>
            <small>{new Date(state.dashboard.date).toDateString()}</small>
          </small>
        </h3>
      </CardHeader>

      {isAdmin && !state.dashboard?.quotation_number && (
        <CardBody>
          <FormControl fullWidth>
            <InputLabel htmlFor="age-native-simple">Municipio </InputLabel>
            <Select
              value={state.dashboard.branchId || state.components.branch[0].id}
              onChange={(e) => dispatch("SET_CITY", +e.target.value)}
              fullWidth
              label="Outlined"
              labelId="Municipio"
              name="Municipio"
              id="Municipio"
              color="primary"
              size="small"
            >
              {state.components.branch.map((br) => {
                return (
                  <MenuItem value={br.id} key={br.id}>
                    {br.branch}
                  </MenuItem>
                );
              })}
            </Select>
            <FormHelperText></FormHelperText>
          </FormControl>
        </CardBody>
      )}

      <CardFooter stats>
        <Table size="small" aria-label="a dense table">
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                {state.dashboard.userData.name}
              </TableCell>
              <TableCell align="right">
                {state.dashboard.userData.email}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{state.dashboard.userData.phone}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardFooter>
    </Card>
  );
}
