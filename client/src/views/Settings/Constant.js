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
import ConstantItems from "./Items/ComponentItems";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useForm } from "hooks/useForm";

import Button from "components/CustomButtons/Button";

const headItems = ["Descripción", "Costo (USD)"];
const useStyles = makeStyles(styles);

const Constant = () => {
  const classes = useStyles();
  const [editMode, setEditMode] = useState(false);
  const { form, onSubmit, updateAll, state, loading } = useForm(
    ["id", "description", "cost"],
    "UPDATE_COMPONENT",
    {
      component_kind: "component_constant",
    }
  );
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
        className={classes.grey}
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography as="h4">Componentes Constantes</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <ConstantItems
          kind="ConstantItems"
          headItems={headItems}
          settingsComponentes={state.components.component_constant}
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
              label="Descripción"
              variant="outlined"
              size="small"
              cost="234234"
              required
              {...form.description}
            /> */}
            <TextField
              className={classes.formItem}
              name="cost"
              label="Valor"
              variant="outlined"
              size="small"
              type="text"
              required
              {...form.cost}
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

export default React.memo(Constant);
