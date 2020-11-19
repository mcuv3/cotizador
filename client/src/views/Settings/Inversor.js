import React, { useState } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  TextField,
} from "@material-ui/core";
import styles from "assets/jss/material-dashboard-react/views/settingsStyles";
import InversorItems from "./Items/ComponentItems";
import Button from "components/CustomButtons/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useForm } from "hooks/useForm";

const headItems = ["Descripción", "Capacidad Kw", "Costo (USD)"];
const useStyles = makeStyles(styles);

const Inversor = () => {
  const classes = useStyles();
  const [editMode, setEditMode] = useState(false);

  const { form, onSubmit, updateAll, state, resetFields, loading } = useForm(
    ["id", "description", "capacity_kw", "cost"],
    editMode ? "UPDATE_COMPONENT" : "ADD_COMPONENT",
    { component_kind: "inversor" }
  );

  const updateComponent = (component) => {
    setEditMode(true);
    updateAll(component);
  };

  const resetForm = () => {
    setEditMode(false);
    resetFields();
  };
  const startSubmit = (e) => {
    setEditMode(false);
    onSubmit(e);
  };
  return (
    <ExpansionPanel className={classes.settings}>
      <ExpansionPanelSummary
        className={classes.warning}
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography as="h4">Inversores</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <InversorItems
          kind="inversor"
          headItems={headItems}
          settingsComponentes={state.components.inversor}
          update={updateComponent}
        />
      </ExpansionPanelDetails>
      <div className={classes.formContainer}>
        {loading && (
          <div className={classes.loadingForm}>
            <CircularProgress color="secondary" />
          </div>
        )}
        <form
          onSubmit={startSubmit}
          className={classes.form}
          autoComplete="off"
        >
          <TextField
            className={classes.formItem}
            id="description"
            name="description"
            label="Descripción"
            variant="outlined"
            size="small"
            required
            {...form.description}
          />
          <TextField
            className={classes.formItem}
            id="capacity_kw"
            name="capacity_kw"
            label="Capacidad Kw"
            variant="outlined"
            size="small"
            type="number"
            required
            {...form.capacity_kw}
          />
          <TextField
            className={classes.formItem}
            id="cost"
            name="cost"
            label="Costo"
            variant="outlined"
            type="text"
            size="small"
            required
            {...form.cost}
          />
          {editMode ? (
            <>
              <Button color="success" type="submit">
                Actualizar
              </Button>
              <Button color="danger" onClick={resetForm}>
                Cancelar
              </Button>
            </>
          ) : (
            <Button color="success" type="submit">
              Agregar
            </Button>
          )}
        </form>
      </div>
    </ExpansionPanel>
  );
};

export default React.memo(Inversor);
