import React, { useState, useEffect } from "react";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import { makeStyles } from "@material-ui/core/styles";
import AddConsumption from "components/ConsumptionTable/ConsumptionTable";
import AddUser from "./AddUser/AddUser";
import Button from "components/CustomButtons/Button";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle";
import { useForm } from "hooks/useForm";
import withError from "HOC/withError";
import CircularProgress from "@material-ui/core/CircularProgress";
const useStyles = makeStyles(styles);

const AddQuotation = ({ triggerError }) => {
  const [consumptions, setConsumptions] = useState({
    columns: [
      {
        title: "Consumo Kw/h",
        field: "kw",
        type: "numeric",
        initialEditValue: 50,
        validate: (rowData) => rowData.kw > 49,
      },
      {
        title: "Costo Bimestral ($)",
        field: "cost",
        type: "numeric",
        initialEditValue: 50,
        validate: (rowData) => rowData.cost > 49,
      },
      {
        title: "Medidor",
        field: "num_measure",
        editable: "onAdd",
        type: "numeric",
        initialEditValue: 1,
        validate: (rowData) => rowData.num_measure > 0,
      },
    ],
    data: [],
  });

  const { form, loading, onSubmit, success } = useForm(
    ["name", "lastname", "phone", "email"],
    "ADD_QUOTATION",
    { consumptions: consumptions.data }
  );

  useEffect(() => {
    setConsumptions((prev) => {
      return {
        ...prev,
        data: [],
      };
    });
  }, [success, setConsumptions]);

  const confirmData = (e) => {
    if (!(consumptions.data.length > 0)) {
      return triggerError("Agrega Consumos!!", true);
    }
    triggerError("Datos de usuario inválidos", false);
    onSubmit(e);
  };
  const classes = useStyles();
  return (
    <GridContainer
      className={classes.addUserQuotationContainer}
      style={{ display: "flex", justifyContent: "center" }}
    >
      {loading && (
        <div className={classes.loadingForm}>
          <CircularProgress color="secondary" />
        </div>
      )}
      <GridItem xs={12} sm={6} md={5}>
        <AddUser form={form} />
      </GridItem>
      <GridItem xs={12} sm={6} md={5}>
        <AddConsumption
          consumptions={consumptions}
          setConsumptions={setConsumptions}
        />
      </GridItem>
      <GridItem xs={12} sm={12} md={10}>
        <Button fullWidth type="submit" color="success" onClick={confirmData}>
          Agregar Cotización
        </Button>
      </GridItem>
    </GridContainer>
  );
};

export default withError(AddQuotation);
