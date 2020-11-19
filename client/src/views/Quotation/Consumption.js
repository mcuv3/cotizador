import { Button, Grid, Grow } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import DomainTwoToneIcon from "@material-ui/icons/DomainTwoTone";
import HomeTwoToneIcon from "@material-ui/icons/HomeTwoTone";
import HomeWorkTwoToneIcon from "@material-ui/icons/HomeWorkTwoTone";
import React, { useState } from "react";
import { useStore } from "../../store/index";
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
  error: {
    color: "#f44336",
    justifySelf: "flex-start",
  },
  secondary: {
    light: "#ff7961",
    main: "#f44336",
    dark: "#ba000d",
    contrastText: "#000",
  },
  buttons: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  button: {
    marginLeft: theme.spacing(1),
    backgroundColor: "#f44336",
    color: "#fff",
  },
}));

export default function CenteredGrid() {
  const classes = useStyles();
  const dispatch = useStore()[1];
  const [consumo, setConsumo] = useState({
    domestica: false,
    residencial: false,
    industrial: false,
  });
  const [error, setError] = useState(null);

  const toggleConsumo = (consumoValue) => {
    const newConsumo = {};
    for (let key in consumo) {
      if (key === consumoValue) newConsumo[key] = true;
      else newConsumo[key] = false;
    }
    setConsumo(newConsumo);
  };
  const submit = () => {
    let consumoOp = null;

    for (let key in consumo) {
      if (consumo[key]) consumoOp = key;
    }
    if (!consumoOp) return setError("Elige una opción, porfavor");

    dispatch("TYPE_CONSUMPTION", consumoOp);
  };

  return (
    <Grow in={true}>
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
                  color={consumo.domestica ? "textPrimary" : "textSecondary"}
                >
                  Doméstica
                </Typography>
                <Typography
                  variant="body2"
                  component="p"
                  color={consumo.domestica ? "textPrimary" : "textSecondary"}
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
                  color={consumo.residencial ? "textPrimary" : "textSecondary"}
                >
                  Comercial
                </Typography>
                <Typography
                  variant="body2"
                  color={consumo.residencial ? "textPrimary" : "textSecondary"}
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
                  color={consumo.industrial ? "textPrimary" : "textSecondary"}
                >
                  Industrial
                </Typography>
                <Typography
                  variant="body2"
                  color={consumo.industrial ? "textPrimary" : "textSecondary"}
                  component="p"
                >
                  Energía Solar Empresarial
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <div className={classes.buttons}>
          {error && <Typography className={classes.error}>{error}</Typography>}

          <Button
            variant="contained"
            className={classes.button}
            onClick={submit}
          >
            Siguiente
          </Button>
        </div>
      </Grid>
    </Grow>
  );
}
