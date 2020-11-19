import React from "react";
import PanelSettings from "./Panel";
import InversorSettings from "./Inversor";
import MountingSettings from "./Mount";
import GeneralSettings from "./General";
import BranchOffice from "./Branchs";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Constant from "./Constant";


const Settings = () => {
  return (
    <>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <GeneralSettings />
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <PanelSettings />
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <InversorSettings />
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <MountingSettings />
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Constant />
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <BranchOffice />
        </GridItem>
      </GridContainer>
    </>
  );
};

export default Settings;
