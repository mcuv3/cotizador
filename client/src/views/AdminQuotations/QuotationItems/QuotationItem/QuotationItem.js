import React, { useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TableRow from "@material-ui/core/TableRow";
import { TableCell } from "@material-ui/core";
import { Link } from "react-router-dom";
import Button from "components/CustomButtons/Button";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@material-ui/core";
import styles from "assets/jss/material-dashboard-react/components/tasksStyle.js";
const useStyles = makeStyles(styles);
const ComponentItem = (props) => {
  const classes = useStyles();
  const sellerRef = useRef();

  let sellerSelect = null;
  if (props.role === "admin" && props.active) {
    sellerSelect = (
      <FormControl style={{ width: "15rem" }} error={false}>
        <InputLabel>Vendedor</InputLabel>
        <Select
          ref={sellerRef}
          fullWidth
          color="primary"
          name="seller"
          id="seller"
          size="small"
          defaultValue={props.sellers[0].email}
        >
          {props.sellers.map((sl, index) => {
            return (
              <MenuItem value={sl.email} key={index}>
                {sl.name +
                  " " +
                  sl.lastname +
                  " - " +
                  sl.email +
                  " - " +
                  sl.branch}
              </MenuItem>
            );
          })}
        </Select>
        <FormHelperText></FormHelperText>
      </FormControl>
    );
  }

  return (
    <TableRow className={classes.tableRow} hover>
      <TableCell align="left">
        <div>
          {props.qto?.name +
            " - " +
            props.qto?.email +
            " - " +
            props.qto?.phone}
        </div>
        <div style={{ textAlign: "right", padding: "0.5rem", color: "#000" }}>
          {new Date(props.qto.date).toLocaleDateString()}
        </div>
      </TableCell>
      <TableCell align="left">
        {props.qto.admin !== "admin@root.com" && sellerSelect
          ? props.qto.admin
          : sellerSelect}
      </TableCell>
      <TableCell align="center">
        <Link to={`/${props.role}/calculo/${props.qto?.quotation}`}>
          Calculo
        </Link>
      </TableCell>
      <TableCell align="center">
        <Link
          to={`/${props.role}/cotizacion/${
            props.active ? "activa" : "enviada"
          }/${props.qto?.quotation}`}
        >
          Cotización
        </Link>
      </TableCell>
      {!props.sent && props.role === "admin" && (
        <>
          <TableCell align="center">{props.qto?.status}</TableCell>
          <TableCell align="center">
            {props.qto?.status === "ASIGNADO" ? (
              <Button color="danger" onClick={props.cancel}>
                Cancelar
              </Button>
            ) : (
              <Button
                color="success"
                onClick={() =>
                  props.assign(sellerRef.current.querySelector("input").value)
                }
              >
                Asignar
              </Button>
            )}
          </TableCell>
        </>
      )}
    </TableRow>
  );
};

export default ComponentItem;
