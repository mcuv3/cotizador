import React from "react";
import { Typography, Slider } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { ThemeProvider } from "@material-ui/styles";

import {
  Select,
  MenuItem,
  InputLabel,
  FormHelperText,
  FormControl,
  Button,
  Box,
  TextField,
} from "@material-ui/core";

import { theme, useStyles } from "./indexStyles/style";
import { useForm } from "../../hooks/useForm";
import Back from "./Back/Back";

function valuetext(value) {
  return `${value} meses`;
}
export default function DatosConsumo() {
  const classes = useStyles();
  const { form, loading, onSubmit, onChange } = useForm(
    ["unidadConsumo", "consumption", "periodo", "mesesFinanciamiento"],
    "DATA_CONSUMPTION"
  );

  return (
    <ThemeProvider theme={theme}>
      <Typography variant="h6" gutterBottom>
        Datos del Consumo
      </Typography>
      <form onSubmit={onSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <FormControl fullWidth error={form.unidadConsumo.error}>
              <InputLabel>Unidad de Consumo</InputLabel>
              <Select
                labelId="unidadConsumo"
                name="unidadConsumo"
                id="unidadConsumo"
                onChange={onChange}
                value={form.unidadConsumo.value}
              >
                <MenuItem value="Pesos">Pesos</MenuItem>
                <MenuItem value="Kw">Kw</MenuItem>
              </Select>

              <FormHelperText>{form.unidadConsumo.helperText}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={12}>
            <FormControl error={form.consumption.error} fullWidth>
              <TextField
                id="consumption"
                name="consumption"
                label="Cantidad del consumo"
                type="number"
                fullWidth
                autoComplete="cc-name"
                value={form.consumption.value}
                error={form.consumption.error}
                onChange={onChange}
              />
              <FormHelperText>{form.consumption.helperText}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth error={form.periodo.error}>
              <InputLabel id="Periodo" color="primary">
                Periodo
              </InputLabel>
              <Select
                label="Outlined"
                labelId="Periodo"
                name="periodo"
                id="periodo"
                color="primary"
                onChange={onChange}
                value={form.periodo.value}
              >
                <MenuItem value="Mensual">Mensual</MenuItem>
                <MenuItem value="Bimestral">Bimestral</MenuItem>
              </Select>

              <FormHelperText>{form.periodo.helperText}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth error={true}>
              <Typography
                id="discrete-slider"
                color={form.mesesFinanciamiento.error ? "primary" : "secondary"}
                gutterBottom
              >
                Meses de Financiamiento
              </Typography>
              <Slider
                defaultValue={0}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={1}
                marks
                min={0}
                max={15}
                name="mesesFinanciamiento"
                id="mesesFinanciamiento"
                onChange={(e, val) => onChange("mesesFinanciamiento", val)}
              />

              <FormHelperText color="primary">
                {form.mesesFinanciamiento.helperText}
              </FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
        <Box className={classes.buttons}>
          <Back disabled={loading} />
          <Button
            variant="contained"
            className={classes.button}
            type="submit"
            disabled={loading}
          >
            Cotizar
          </Button>
        </Box>
      </form>
    </ThemeProvider>
  );
}
