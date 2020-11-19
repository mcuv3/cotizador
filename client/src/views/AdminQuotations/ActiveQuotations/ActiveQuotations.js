import React from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import styles from "assets/jss/material-dashboard-react/views/settingsStyles";
import QuotationItems from "../QuotationItems/QuotationItems";

const useStyles = makeStyles(styles);

const ActiveQuotations = (props) => {
  const classes = useStyles();

  return (
    <ExpansionPanel className={classes.settings}>
      <ExpansionPanelSummary
        className={classes.info}
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography as="h4">Cotizaciones Activas</Typography>
      </ExpansionPanelSummary>

      {props.active.length !== 0 ? (
        props.sellers.length === 0 && props.role === "admin" ? (
          <Typography variant="h4" gutterBottom style={{ textAlign: "center" }}>
            Hay cotizaciones pero no vendedores
          </Typography>
        ) : (
          <>
            <ExpansionPanelDetails>
              <QuotationItems
                quotations={props.active}
                role={props.role}
                sellers={props.sellers}
                assign={props.assign}
                cancel={props.cancel}
                active
              />
            </ExpansionPanelDetails>
            <div className={classes.centered}>
              <Pagination
                page={props.pageActive}
                count={props.pagination}
                size="large"
                onChange={(e, val) => props.paginationChange(val, true)}
                showLastButton={false}
              />
            </div>
          </>
        )
      ) : (
        <Typography
          variant="h4"
          gutterBottom
          style={{ textAlign: "center", padding: "2rem" }}
        >
          No hay cotizaciones por hacer.
        </Typography>
      )}
    </ExpansionPanel>
  );
};

export default ActiveQuotations;
