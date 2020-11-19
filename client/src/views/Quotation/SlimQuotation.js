import {
  Button,
  CircularProgress,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import EcoIcon from "@material-ui/icons/Eco";
import EventNoteIcon from "@material-ui/icons/EventNote";
import EvStationIcon from "@material-ui/icons/EvStation";
import React, { useState } from "react";
import { useStore } from "../../store/index";
import Back from "./Back/Back";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    height: "100%",
  },
  item: {
    width: "100%",
    marginTop: "0.75rem",
  },
  orange: {
    color: "#f44336",
    background: "#fff",
  },
  costo: {
    display: "flex",
    textAlign: "center",
    justifyContent: "center",
  },
  title: {
    marginRight: "0.5rem",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
    backgroundColor: "#f44336",
    color: "#fff",
  },
  buttons: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
}));

export default function CotizaciónSlim() {
  const classes = useStyles();
  const [state, dispatch] = useStore();
  const [loading, setLoading] = useState(false);

  const nextAction = () => {
    setLoading(true);
    dispatch("NEXT");
  };
  // HITCH,
  // MONTH,
  // SAVING,
  // TOTAL,
  const formater = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
  console.log(state);

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} className={classes.costo}>
          <Typography variant="h5" className={classes.title}>
            Costo Recomendado
          </Typography>
          <Typography className={classes.orange} variant="h6">
            {`${formater.format(state.Quotation.TOTAL)}`}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <List className={classes.root}>
            <Paper elevation={2} className={classes.item}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar className={classes.orange}>
                    <AttachMoneyIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Enganche Mínimo"
                  secondary={`$${state.Quotation.HITCH}`}
                />
              </ListItem>
            </Paper>
            <Paper elevation={2} className={classes.item}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar className={classes.orange}>
                    <EventNoteIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Mensualidad"
                  secondary={`$${state.Quotation.MONTH}`}
                />
              </ListItem>
            </Paper>
          </List>
        </Grid>
        <Grid item xs={6}>
          <List className={classes.root}>
            <Paper elevation={2} className={classes.item}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar className={classes.orange}>
                    <EvStationIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Ahorro Estimado"
                  secondary={`$${state.Quotation.SAVING}`}
                />
              </ListItem>
            </Paper>
            <Paper elevation={2} className={classes.item}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar className={classes.orange}>
                    <EcoIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Huella Ecológica" secondary="100%" />
              </ListItem>
            </Paper>
          </List>
        </Grid>
      </Grid>
      <div className={classes.buttons}>
        {loading && <CircularProgress className={classes.orange} />}
        <Back disable={loading} />
        <Button
          variant="contained"
          className={classes.button}
          onClick={nextAction}
          disabled={loading}
        >
          Cotización Completa
        </Button>
      </div>
    </>
  );
}
