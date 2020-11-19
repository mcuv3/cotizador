import React from "react";
import { useForm } from "../../hooks/useForm";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import {
  CssBaseline,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Person from "@material-ui/icons/Person";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Copyright from "../../components/CopyRigth/CopyRight";
import { theme } from "../Quotation/indexStyles/style";
import { ThemeProvider } from "@material-ui/styles";
import withError from "HOC/withError";
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
  center: {
    textAlign: "center",
  },
}));

function AddSeller(props) {
  const classes = useStyles();
  const { form, loading, onSubmit, state, onChange } = useForm(
    [
      "name",
      "lastname",
      "email",
      "phone",
      "password",
      "confirmPassword",
      "branch",
    ],
    "ADD_SELLER"
  );

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          {loading ? (
            <CircularProgress color="secondary" />
          ) : (
            <Avatar className={classes.avatar}>
              <Person />
            </Avatar>
          )}
          <Typography component="h1" variant="h5" className={classes.title}>
            Ingrese los datos del vendedor
          </Typography>
          <form className={classes.form} noValidate onSubmit={onSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  color="primary"
                  autoComplete="fname"
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  {...form.name}
                  id="name"
                  label="Nombre(s)"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  color="primary"
                  variant="outlined"
                  required
                  fullWidth
                  {...form.lastname}
                  id="lastname"
                  label="Apellido(s)"
                  name="lastname"
                  autoComplete="lname"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  color="primary"
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  {...form.email}
                  label="Correo Electrónico"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  color="primary"
                  variant="outlined"
                  required
                  fullWidth
                  id="phone"
                  {...form.phone}
                  label="555 555 5555"
                  name="phone"
                  autoComplete="phone"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  color="primary"
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  {...form.password}
                  label="Contraseña"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  color="primary"
                  variant="outlined"
                  required
                  fullWidth
                  name="confirmPassword"
                  {...form.confirmPassword}
                  label="Confirma tu contraseña"
                  type="password"
                  id="confirmPassword"
                  autoComplete="current-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth error={form.branch.error}>
                  <InputLabel>Sucursal</InputLabel>
                  <Select
                    onChange={onChange}
                    value={form.branch.value}
                    fullWidth
                    color="primary"
                    name="branch"
                    id="branch"
                    size="small"
                    defaultValue={state.components.branch[0].id}
                  >
                    {state.components.branch.map((br) => {
                      return (
                        <MenuItem value={br.id} key={br.id}>
                          {br.branch}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  <FormHelperText>{form.branch.helperText}</FormHelperText>
                </FormControl>
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={loading}
            >
              Crear Cuenta
            </Button>
          </form>
        </div>

        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default withError(AddSeller);
