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
import CircularProgress from "@material-ui/core/CircularProgress";
import styles from "assets/jss/material-dashboard-react/views/settingsStyles";
import MountingItems from "./Items/ComponentItems";
import Button from "components/CustomButtons/Button";
import { useForm } from "hooks/useForm";

const headItems = ["Descripción", "Costo (USD)"];
const useStyles = makeStyles(styles);

const Mount = () => {
  const classes = useStyles();
  const [editMode, setEditMode] = useState(false);

  const { form, onSubmit, updateAll, state, resetFields, loading } = useForm(
    ["id", "description", "cost"],
    editMode ? "UPDATE_COMPONENT" : "ADD_COMPONENT",
    { component_kind: "mounting_system" }
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
        className={classes.danger}
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography as="h4">Sistema de Montaje</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <MountingItems
          kind="mounting_system"
          headItems={headItems}
          settingsComponentes={state.components.mounting_system}
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

export default React.memo(Mount);
