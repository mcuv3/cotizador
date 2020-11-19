import React from "react";
import { useForm } from "../../hooks/useForm";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { CircularProgress } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import Copyright from "../../components/CopyRigth/CopyRight";
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
  const { form, loading, onSubmit } = useForm(["email", "password"], "LOG_IN");

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            {loading ? (
              <CircularProgress color="secondary" />
            ) : (
              <LockOutlinedIcon />
            )}
          </Avatar>
          <Typography component="h1" variant="h5">
            Inicia Sesión
          </Typography>
          <form className={classes.form} noValidate onSubmit={onSubmit}>
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
              autoFocus
              disabled={loading}
            />
            <TextField
              color="primary"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              {...form.password}
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
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
              Iniciar Sesion
            </Button>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </ThemeProvider>
  );
}
export default withRouter(LogIn);
