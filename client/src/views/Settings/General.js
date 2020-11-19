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
import GeneralItems from "./Items/ComponentItems";
import { useForm } from "hooks/useForm";
import Button from "components/CustomButtons/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const headItems = ["Ganancia", "Valor"];

const useStyles = makeStyles(styles);

const General = () => {
  const classes = useStyles();
  const [editMode, setEditMode] = useState(false);
  const {
    form,
    onSubmit,
    updateAll,
    state,

    loading,
  } = useForm(["id", "description", "value"], "UPDATE_COMPONENT", {
    component_kind: "constant",
  });
  const updateComponent = (component) => {
    setEditMode(true);
    updateAll(component);
  };
  const startSubmit = (e) => {
    setEditMode(false);
    onSubmit(e);
  };

  return (
    <ExpansionPanel className={classes.settings}>
      <ExpansionPanelSummary
        className={classes.success}
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography as="h4">Generales</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <GeneralItems
          kind="GeneralItems"
          headItems={headItems}
          settingsComponentes={state.components.constant}
          update={updateComponent}
        />
      </ExpansionPanelDetails>
      {editMode && (
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
            {/* <TextField
              className={classes.formItem}
              name="description"
              label="Ganancia"
              variant="outlined"
              size="small"
              value="234234"
              required
              {...form.description}
            /> */}
            <TextField
              className={classes.formItem}
              name="value"
              label="Valor"
              variant="outlined"
              size="small"
              value="123123"
              required
              {...form.value}
            />
            <Button color="success" type="submit">
              Actualizar
            </Button>
            <Button color="danger" onClick={() => setEditMode(false)}>
              Cancelar
            </Button>
          </form>
        </div>
      )}
    </ExpansionPanel>
  );
};

export default React.memo(General);
