import React from "react";
import { Grid, TextField } from "@material-ui/core";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import CardIcon from "components/Card/CardIcon.js";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
const useStyles = makeStyles(styles);
const AddUser = ({ form }) => {
  const classes = useStyles();
  return (
    <Card className={classes.addUserQuotation}>
      <CardHeader color="warning" stats icon>
        <CardIcon color="warning">
          <AccountCircleIcon />
        </CardIcon>
        <p className={classes.cardCategory}>Datos del Usuario</p>
      </CardHeader>

      <Grid container spacing={2} className={classes.userData}>
        <Grid item xs={12} sm={12}>
          <TextField
            color="primary"
            name="name"
            variant="outlined"
            required
            fullWidth
            {...form.name}
            id="name"
            label="Nombre(s)"
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            color="primary"
            variant="outlined"
            required
            fullWidth
            {...form.lastname}
            id="lastname"
            label="Apellido(s)"
            name="lastname"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            color="primary"
            variant="outlined"
            required
            fullWidth
            id="email"
            {...form.email}
            label="Correo Electrónico"
            name="email"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            color="primary"
            variant="outlined"
            required
            fullWidth
            id="phone"
            {...form.phone}
            label="Número Telefónico"
            name="phone"
          />
        </Grid>
      </Grid>
    </Card>
  );
};

export default AddUser;
