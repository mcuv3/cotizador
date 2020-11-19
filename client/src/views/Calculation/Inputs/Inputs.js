import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardHeader from "components/Card/CardHeader.js";
import Card from "@material-ui/core/Card";
import CardBody from "components/Card/CardBody.js";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import Button from "components/CustomButtons/Button";
import { Link } from "react-router-dom";
import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  FormHelperText,
} from "@material-ui/core";

const useStyles = makeStyles(styles);

export default function Inputs({
  solar_panels,
  getCalculations,
  quotationId,
  role,
}) {
  const classes = useStyles();
  const [panel, setPanel] = useState(0);
  const [numPanel, setNumPanel] = useState(0);
  return (
    <Card>
      <CardHeader color="danger" className={classes.inputCalculation}>
        Cálculos
      </CardHeader>
      <CardBody>
        <form noValidate>
          <FormControl fullWidth>
            <InputLabel htmlFor="age-native-simple">Panel Solar</InputLabel>
            <Select
              fullWidth
              label="Outlined"
              labelId="Panel"
              name="panel"
              id="panel"
              color="primary"
              size="small"
              onChange={(e) => setPanel(e.target.value)}
              value={panel}
            >
              {solar_panels.map((panel, index) => {
                return (
                  <MenuItem value={index} key={index}>
                    {panel.description}
                  </MenuItem>
                );
              })}
            </Select>
            <FormHelperText></FormHelperText>
          </FormControl>

          <TextField
            value={numPanel}
            onChange={(e) => setNumPanel(+e.target.value)}
            color="primary"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="panelNumber"
            label="Paneles Real"
            name="panelNumber"
            autoComplete="panelNumber"
            size="small"
            type="number"
          />
          <Button
            color="danger"
            onClick={() => getCalculations(panel, numPanel)}
          >
            Aplicar Cambios
          </Button>
          <Link to={`/${role}/cotizacion/${quotationId}`}>
            <Button color="info">Ir a la cotización</Button>
          </Link>
        </form>
      </CardBody>
    </Card>
  );
}
