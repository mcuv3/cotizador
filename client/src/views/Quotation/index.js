import React, { useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";

import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Consumo from "./Consumption";
import DatosConsumo from "./ConsumptionData";
import UserData from "./UserData";
import SlimQuotation from "./SlimQuotation";
import SendEmail from "./EmailSent";
import Error from "./Error";
import Copyright from "../../components/CopyRigth/CopyRight";
import { useStyles, QontoStepIcon, QontoConnector } from "./indexStyles/style";
import { useStore } from "../../store/index";

const steps = ["Tipo de Consumo", "Datos de Consumo", "Cotización", "Contacto"];

export default function Quotation() {
  const classes = useStyles();
  const [state, dispatch] = useStore();

  let stepComponent;
  switch (state.Quotation.step) {
    case 0:
      stepComponent = <Consumo />;
      break;
    case 1:
      stepComponent = <DatosConsumo />;
      break;
    case 2:
      stepComponent = <SlimQuotation />;
      break;
    case 3:
      stepComponent = <UserData qto />;
      break;
    case 4:
      stepComponent = <SendEmail />;
      break;
    case 5:
      stepComponent = <Error />;
      break;
    default:
      stepComponent = <Error />;
  }
  useEffect(() => {
    return () => {
      dispatch("RESET_STEPS");
    };
  }, [dispatch]);

  return (
    <>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Cotizador de Paneles Solares
          </Typography>
          <Stepper
            activeStep={state.Quotation.step}
            className={classes.stepper}
            connector={<QontoConnector />}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {stepComponent}
        </Paper>
        <Copyright />
      </main>
    </>
  );
}
