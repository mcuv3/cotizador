import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import {
  TextField,
  MenuItem,
  FormHelperText,
  FormControl,
  InputLabel,
  Select,
} from "@material-ui/core";
import HomeTwoToneIcon from "@material-ui/icons/HomeTwoTone";
import HomeWorkTwoToneIcon from "@material-ui/icons/HomeWorkTwoTone";
import CardActionArea from "@material-ui/core/CardActionArea";
import DomainTwoToneIcon from "@material-ui/icons/DomainTwoTone";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "75%",
    margin: "auto",
  },
  type: {
    flexGrow: 1,
    textAlign: "center",
  },
  paper: {
    padding: "1rem",
    textAlign: "center",
    color: "primary",
    fontSize: "5rem",
    height: "auto",
  },
  form: {
    width: "50%", // Fix IE 11 issue.
    margin: "auto",
    padding: "1rem",
  },
  Icono: {
    fontSize: "5rem",
  },
  formControl: {
    margin: "auto",
  },
}));

export default function CenteredGrid() {
  const classes = useStyles();

  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <Paper className={classes.paper}>Contizador de Paneles Solares</Paper>
      </Grid>
      <Grid item xs={4}>
        <Card className={classes.type}>
          <CardActionArea className={classes.type}>
            <CardContent className={classes.type}>
              <HomeTwoToneIcon style={{ fontSize: "3rem" }}>
                add_circle
              </HomeTwoToneIcon>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                color="error"
              >
                Domestica
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Energia Solar Para Tu Casa
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      <Grid item xs={4}>
        <Card className={classes.type}>
          <CardActionArea className={classes.type}>
            <CardContent className={classes.type}>
              <HomeWorkTwoToneIcon style={{ fontSize: "3rem" }}>
                add_circle
              </HomeWorkTwoToneIcon>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                color="error"
              >
                Residencial
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Energia Solar Residencial
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      <Grid item xs={4}>
        <Card className={classes.type}>
          <CardActionArea className={classes.type}>
            <CardContent className={classes.type}>
              <DomainTwoToneIcon
                style={{ fontSize: "3rem" }}
              ></DomainTwoToneIcon>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                color="error"
              >
                Industrial
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Energía solar para tu empresa
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      <Grid item xs={12}>
        {/* className={classes.form} */}
        <Card className={classes.form}>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-helper-label">
              Periodo
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              //   value={age}
              //   onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
            <FormHelperText>Some important helper text</FormHelperText>
          </FormControl>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="Cantidad"
            label="Cantidad"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-helper-label">
              Consumo
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              //   value={age}
              //   onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
            <FormHelperText>Some important helper text</FormHelperText>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-helper-label">Tarifa</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              //   value={age}
              //   onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
            <FormHelperText>Some important helper text</FormHelperText>
          </FormControl>
        </Card>
      </Grid>
      <Grid item xs={6}>
        <Paper className={classes.paper}>xs=3</Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper className={classes.paper}>xs=3</Paper>
      </Grid>
    </Grid>
  );
}
