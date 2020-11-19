import React, { useState } from "react";
import {
  FormControl,
  Select,
  TextField,
  InputLabel,
  MenuItem,
} from "@material-ui/core";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import { useStore } from "store/index";
import Button from "components/CustomButtons/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import  { format } from '../../../util/formater'

const useStyles = makeStyles(styles);
const ComponentItem = ({
  index,
  kind,
  initialQty,
  component,
  isConstant,
  workforce,
  mounting_system,
  comp_gain_factor,
}) => {
  const classes = useStyles();
  const dispatch = useStore(false)[1];
  const [currentComp, setCurrentComp] = useState(
    component.initialComponent || component.components[0]
  );
  const [qty, setQty] = useState(initialQty);
  const cost = currentComp.cost;
  const originalCost =
    typeof cost === "number" ? cost : cost.split("$")[1].split(",").join("");
  let componentSelect = currentComp.description;
  if (!isConstant) {
    componentSelect = (
      <FormControl>
        <InputLabel>{component.label}</InputLabel>
        <Select
          fullWidth
          label="Outlined"
          labelId="Componente"
          name="component"
          id="component"
          size="small"
          onChange={(e) => {
            setCurrentComp(
              component.components.find((i) => i.id === e.target.value)
            );
            dispatch("CHANGE_COMPONENT", {
              kind,
              index,
              qty,
              component_id: e.target.value,
            });
          }}
          value={currentComp.id}
        >
          {component.components.map((comp, idx) => {
            return (
              <MenuItem value={comp.id} key={idx}>
                {comp.description}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    );
  }

  return (
    <TableRow className={classes.hover}>
      <TableCell component="th" scope="row">
        {!workforce && (
          <TextField
            type="number"
            size="small"
            variant="standard"
            id="id"
            name="qty"
            onChange={(e) => {
              setQty(+e.target.value);

              dispatch("CHANGE_COMPONENT", {
                kind,
                index,
                qty: +e.target.value,
                component_id: currentComp.id,
              });
            }}
            value={qty}
          />
        )}
      </TableCell>
      <TableCell component="th" align="left" scope="row">
        {componentSelect}
      </TableCell>

      <TableCell style={{ width: 160 }} align="right">
        {workforce
          ? currentComp.percentage
          : `${format.format((originalCost * (comp_gain_factor.value + 1)))}`}
      </TableCell>
      <TableCell style={{ width: 160 }} align="right">
        {workforce ? (
          currentComp.cost
        ) : (
          <>
            ${format.format((originalCost * qty * (comp_gain_factor?.value + 1)))}
          </>
        )}
      </TableCell>
      {mounting_system && (
        <TableCell>
          <Button
            color="danger"
            onClick={() => {
              dispatch("REMOVE_MOUNTING");
            }}
          >
            <DeleteIcon />
          </Button>
        </TableCell>
      )}
    </TableRow>
  );
};

export default ComponentItem;
