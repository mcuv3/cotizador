import React, { useState } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  TextField,
} from "@material-ui/core";
import styles from "assets/jss/material-dashboard-react/views/settingsStyles";
import PanelItems from "./Items/ComponentItems";
import Button from "components/CustomButtons/Button";
import { useForm } from "hooks/useForm";
import withError from "HOC/withError";
const headItems = ["Descripción", "Watts", "Metros Cuadrados", "Costo (USD)"];
const useStyles = makeStyles(styles);

const Panel = () => {
  const classes = useStyles();

  const [editMode, setEditMode] = useState(false);

  const { form, onSubmit, updateAll, state, resetFields, loading } = useForm(
    ["id", "description", "watts", "dimension", "cost"],
    editMode ? "UPDATE_COMPONENT" : "ADD_COMPONENT",
    { component_kind: "solar_panel" }
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
        className={classes.info}
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography as="h4">Paneles Solares</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <PanelItems
          kind="solar_panel"
          headItems={headItems}
          settingsComponentes={state.components.solar_panel}
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
            id="watts"
            name="watts"
            label="Watts"
            variant="outlined"
            size="small"
            required
            type="number"
            {...form.watts}
          />

          <TextField
            className={classes.formItem}
            id="dimension"
            name="dimension"
            label="Dimension"
            variant="outlined"
            type="number"
            size="small"
            required
            {...form.dimension}
          />
          <TextField
            className={classes.formItem}
            id="cost"
            name="cost"
            label="Costo"
            variant="outlined"
            size="small"
            type="text"
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

export default React.memo(withError(Panel));
