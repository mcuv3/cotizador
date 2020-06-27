import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";

import HomeTwoToneIcon from "@material-ui/icons/HomeTwoTone";
import HomeWorkTwoToneIcon from "@material-ui/icons/HomeWorkTwoTone";
import CardActionArea from "@material-ui/core/CardActionArea";
import DomainTwoToneIcon from "@material-ui/icons/DomainTwoTone";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import Typography from "@material-ui/core/Typography";

import { createMuiTheme } from "@material-ui/core/styles";

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
  primary: {
    backgroundColor: "#f44336",
    color: "#fff",
  },
  secondary: {
    light: "#ff7961",
    main: "#f44336",
    dark: "#ba000d",
    contrastText: "#000",
  },
}));

export default function CenteredGrid() {
  const classes = useStyles();
  const [consumo, setConsumo] = useState({
    domestica: false,
    residencial: false,
    industrial: false,
  });

  const toggleConsumo = (consumoValue) => {
    const newConsumo = {};
    for (let key in consumo) {
      if (key === consumoValue) newConsumo[key] = true;
      else newConsumo[key] = false;
    }
    setConsumo(newConsumo);
  };

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={4} onClick={() => toggleConsumo("domestica")}>
          <Card className={consumo.domestica ? classes.primary : ""}>
            <CardActionArea className={classes.type}>
              <CardContent className={classes.type}>
                <HomeTwoToneIcon
                  style={{
                    fontSize: "8rem",
                    color: consumo.domestica && "black",
                  }}
                ></HomeTwoToneIcon>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  color={consumo.domestica ? "" : "textSecondary"}
                >
                  Domestica
                </Typography>
                <Typography
                  variant="body2"
                  component="p"
                  color={consumo.domestica ? "" : "textSecondary"}
                >
                  Energia Solar Para Tu Casa
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={4} onClick={() => toggleConsumo("residencial")}>
          <Card className={consumo.residencial ? classes.primary : ""}>
            <CardActionArea className={classes.type}>
              <CardContent className={classes.type}>
                <HomeWorkTwoToneIcon
                  style={{
                    fontSize: "8rem",
                    color: consumo.residencial && "black",
                  }}
                ></HomeWorkTwoToneIcon>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  color={consumo.residencial ? "" : "textSecondary"}
                >
                  Residencial
                </Typography>
                <Typography
                  variant="body2"
                  color={consumo.residencial ? "" : "textSecondary"}
                  component="p"
                >
                  Energia Solar Residencial
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={4} onClick={() => toggleConsumo("industrial")}>
          <Card className={consumo.industrial ? classes.primary : ""}>
            <CardActionArea className={classes.type}>
              <CardContent className={classes.type}>
                <DomainTwoToneIcon
                  style={{
                    fontSize: "8rem",
                    color: consumo.industrial && "black",
                  }}
                ></DomainTwoToneIcon>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  color={consumo.industrial ? "" : "textSecondary"}
                >
                  Industrial
                </Typography>
                <Typography
                  variant="body2"
                  color={consumo.industrial ? "" : "textSecondary"}
                  component="p"
                >
                  Energía solar para tu empresa
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
