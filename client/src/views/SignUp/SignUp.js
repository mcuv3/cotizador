import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Copyright from "../../components/CopyRigth/CopyRight";
import { theme } from "../Cotizador/indexStyles/style";
import { ThemeProvider } from "@material-ui/styles";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  title: {
    textAlign: "center",
    marginBottom: "0.5rem",
  },
}));

export default function SignUp(props) {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          {props.title ? null : (
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
          )}
          <Typography component="h1" variant="h5" className={classes.title}>
            Registrate {props.title ? props.title : ""}
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  color="primary"
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="Nombre(s)"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  color="primary"
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Apellido(s)"
                  name="lastName"
                  autoComplete="lname"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  color="primary"
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Correo Electrónico"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  color="primary"
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Registrate
            </Button>
            <Grid container justify="flex-end">
              <Grid item color="secondary">
                <NavLink to="/home/LogIn">
                  ¿Ya tienes cuenta? Inicia Sesión
                </NavLink>
              </Grid>
            </Grid>
          </form>
        </div>
        {props.title ? null : (
          <Box mt={5}>
            <Copyright />
          </Box>
        )}
      </Container>
    </ThemeProvider>
  );
}
