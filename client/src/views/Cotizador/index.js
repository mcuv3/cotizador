import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Consumo from "./Consumo";
import DatosConsumo from "./DatosConsumo";
import SignUp from "./Cotizacion";
import Copyright from "../../components/CopyRigth/CopyRight";
import { useStyles, QontoStepIcon, QontoConnector } from "./indexStyles/style";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

const steps = ["Consumo", "Datos de Consumo", "Contización"];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <Consumo />;
    case 1:
      return <DatosConsumo />;
    case 2:
      return <SignUp />; //if check of logged users
    default:
      throw new Error("Unknown step");
  }
}

export default function Checkout() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const handleNext = () => setActiveStep(activeStep + 1);
  const handleBack = () => setActiveStep(activeStep - 1);

  return (
    <>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Cotizador de Paneles Solares
          </Typography>
          <Stepper
            activeStep={activeStep}
            className={classes.stepper}
            connector={<QontoConnector />}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {activeStep === steps.length ? (
            <div className={classes.success}>
              <CheckCircleIcon color="success" style={{ fontSize: "4rem" }} />
              <Typography variant="h3" gutterBottom>
                Tu contización a sido enviada a tu correo.
              </Typography>
            </div>
          ) : (
            <>
              {getStepContent(activeStep)}
              <div className={classes.buttons}>
                {activeStep <= 1 ? (
                  <>
                    {activeStep !== 0 && (
                      <Button onClick={handleBack} className={classes.button}>
                        Atras
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="#f44336"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      {activeStep === 1 ? "Recibir Cotización" : "Siguiente"}
                    </Button>
                  </>
                ) : (
                  <Button onClick={handleBack} className={classes.button}>
                    Atras
                  </Button> //only if user is not logged in other wise
                )}
              </div>
            </>
          )}
        </Paper>
        <Copyright />
      </main>
    </>
  );
}
