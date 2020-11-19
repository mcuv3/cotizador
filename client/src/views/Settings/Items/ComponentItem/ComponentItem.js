import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import TableRow from "@material-ui/core/TableRow";
import { TableCell } from "@material-ui/core";

// @material-ui/icons

import Close from "@material-ui/icons/Close";

// core components
import styles from "assets/jss/material-dashboard-react/components/tasksStyle.js";

const useStyles = makeStyles(styles);

const ComponentItem = (props) => {
  const classes = useStyles();

  return (
    <TableRow className={classes.tableRow} hover onClick={props.update}>
      {Object.keys(props.component).map((property, index) => {
        if (index === 0) return null;
        return <TableCell key={index}>{props.component[property]}</TableCell>;
      })}
      {props.kind !== "GeneralItems" && props.kind !== "ConstantItems" && (
        <TableCell
          className={classes.tableActions}
          onClick={(e) => {
            e.stopPropagation();
            props.delete();
          }}
        >
          <Tooltip
            id="tooltip-top-start"
            title="Eliminar"
            placement="top"
            classes={{ tooltip: classes.tooltip }}
          >
            <IconButton
              aria-label="Delete"
              className={classes.tableActionButton}
            >
              <Close
                className={classes.tableActionButtonIcon + " " + classes.close}
              />
            </IconButton>
          </Tooltip>
        </TableCell>
      )}
    </TableRow>
  );
};

export default ComponentItem;
