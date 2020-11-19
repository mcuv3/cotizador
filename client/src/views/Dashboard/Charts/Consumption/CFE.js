import React from "react";

import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";

export default function Dashboard() {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Consumo Promedio Energía Mensual Futuro</TableCell>
          <TableCell>Retorno de Inversión en Meses</TableCell>
          <TableCell>Retorno de Inversión en Años</TableCell>
          <TableCell>Pago Estimado a CFE en el futuro</TableCell>
          <TableCell>Ahorro Esperado (MXP) por Proyecto</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>522</TableCell>
          <TableCell>683</TableCell>
          <TableCell>57.0</TableCell>
          <TableCell>53</TableCell>
          <TableCell>$175,232</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
