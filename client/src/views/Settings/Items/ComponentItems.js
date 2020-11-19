import React from "react";
import ComponentItem from "./ComponentItem/ComponentItem";
import { makeStyles } from "@material-ui/core/styles";
import TableRow from "@material-ui/core/TableRow";
import { TableCell, TableHead, TableBody, Table } from "@material-ui/core";
import styles from "assets/jss/material-dashboard-react/components/tasksStyle.js";
import { useStore } from "store/index";

const useStyles = makeStyles(styles);

export default function ComponentItems(props) {
  const classes = useStyles();
  const dispatch = useStore()[1];
  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          {props.headItems.map((cell, index) => (
            <TableCell key={index}>{cell}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {props.settingsComponentes.map((comp, index) => {
          return (
            <ComponentItem
              key={index}
              kind={props.kind}
              component={comp}
              update={() => props.update(comp)}
              delete={() =>
                dispatch("DELETE_COMPONENT", {
                  id: comp.id,
                  component_kind: props.kind,
                })
              }
            />
          );
        })}
      </TableBody>
    </Table>
  );
}
