import React from "react";
import { useForm } from "../../hooks/useForm";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { theme } from "../Quotation/indexStyles/style";
import { ThemeProvider } from "@material-ui/styles";

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function LogIn(props) {
  const classes = useStyles();
  const { form, loading, onSubmit } = useForm(
    ["email", "phone", "name"],
    "QUOTATION_FULL"
  );

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Ingresa tus Datos
          </Typography>
          <form className={classes.form} noValidate onSubmit={onSubmit}>
            <TextField
              color="primary"
              variant="outlined"
              margin="normal"
              {...form.name}
              required
              fullWidth
              id="name"
              label="Nombre Completo"
              name="name"
              autoComplete="name"
              autoFocus
              disabled={loading}
            />

            <TextField
              color="primary"
              variant="outlined"
              margin="normal"
              {...form.email}
              required
              fullWidth
              id="email"
              label="Correo Electrónico"
              name="email"
              autoComplete="email"
              disabled={loading}
            />
            <TextField
              color="primary"
              variant="outlined"
              margin="normal"
              {...form.phone}
              required
              fullWidth
              id="phone"
              label="Numero Telefónico"
              name="phone"
              autoComplete="phone"
              disabled={loading}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={loading}
            >
              Enviar Cotización
            </Button>
          </form>
        </div>
      </Container>
    </ThemeProvider>
  );
}
export default withRouter(LogIn);
