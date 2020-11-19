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
import BranchItems from "./Items/ComponentItems";
import Button from "components/CustomButtons/Button";

import { useForm } from "hooks/useForm";

const headItems = ["Sucursal"];
const useStyles = makeStyles(styles);

const Branch = () => {
  const classes = useStyles();
  const [editMode, setEditMode] = useState(false);

  const { form, onSubmit, updateAll, state, loading, resetFields } = useForm(
    ["id", "branch"],
    editMode ? "UPDATE_COMPONENT" : "ADD_COMPONENT",
    { component_kind: "branch" }
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
        <Typography as="h4">Sucursales</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <BranchItems
          kind="branch"
          headItems={headItems}
          settingsComponentes={state.components.branch}
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
            id="branch"
            name="branch"
            label="Sucursal"
            variant="outlined"
            size="small"
            required
            {...form.branch}
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

export default React.memo(Branch);
