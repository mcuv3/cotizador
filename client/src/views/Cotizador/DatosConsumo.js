import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import { ThemeProvider } from "@material-ui/styles";

import {
  Select,
  MenuItem,
  InputLabel,
  FormHelperText,
  FormControl,
} from "@material-ui/core";

import { CssTextField, theme } from "./indexStyles/style";

export default function PaymentForm() {
  return (
    <ThemeProvider theme={theme}>
      <Typography variant="h6" gutterBottom>
        Datos del Consumo
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <FormControl fullWidth>
            <InputLabel id="Consumo" color="info">
              Consumo
            </InputLabel>
            <Select
              labelId="Consumo"
              id="Consumo"
              color="info"
              //   value={age}
              //   onChange={handleChange}
            >
              <MenuItem value="Pesos">Pesos</MenuItem>
              <MenuItem value="Wats">Wats</MenuItem>
            </Select>
            <FormHelperText>Seleccione el tipo de consumo</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={12}>
          <CssTextField
            id="cardName"
            label="Cantidad del consumo"
            fullWidth
            autoComplete="cc-name"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel id="Periodo" color="primary">
              Periodo
            </InputLabel>
            <Select
              label="Outlined"
              labelId="Periodo"
              id="Periodo"
              color="primary"
              //   value={age}
              //   onChange={handleChange}
            >
              <MenuItem value="Mensual">Mensual</MenuItem>
              <MenuItem value="Bimestral">Bimestral</MenuItem>
            </Select>
            <FormHelperText>Seleccione el periodo a cotizar</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel id="Tarifa" color="primary">
              Tarifa
            </InputLabel>
            <Select
              labelId="Tarifa"
              id="Tarifa"
              color="primary"
              //   value={age}
              //   onChange={handleChange}
            >
              <MenuItem value="DAC">DAC</MenuItem>
              <MenuItem value="02">02</MenuItem>
              <MenuItem value="1B/1C/1D">1B/1C/1D</MenuItem>
            </Select>
            <FormHelperText>Seleccione el tipo de tarifa</FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
