import React from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
} from "@material-ui/core";
import styles from "assets/jss/material-dashboard-react/views/settingsStyles";
import QuotationItems from "../QuotationItems/QuotationItems";
import Pagination from "@material-ui/lab/Pagination";
const useStyles = makeStyles(styles);

const SentQuotations = (props) => {
  const classes = useStyles();

  return (
    <ExpansionPanel className={classes.settings}>
      <ExpansionPanelSummary
        className={classes.success}
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography as="h4">Cotizaciones Enviadas</Typography>
      </ExpansionPanelSummary>

      {props.sent.length !== 0 ? (
        <>
          <ExpansionPanelDetails>
            <QuotationItems quotations={props.sent} role={props.role} />
          </ExpansionPanelDetails>
          <div className={classes.centered}>
            <Pagination
              page={props.pageActive}
              count={props.pagination}
              size="large"
              onChange={(e, val) => props.paginationChange(val, false)}
            />
          </div>
        </>
      ) : (
        <Typography
          variant="h4"
          gutterBottom
          style={{ textAlign: "center", padding: "2rem" }}
        >
          No hay cotizaciones enviadas.
        </Typography>
      )}
    </ExpansionPanel>
  );
};

export default SentQuotations;
