import React from "react";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import UserData from "./UserData/UserData";
import Pricing from "./Pricing/Pricing";
import Charts from "./Charts/Charts";
import Components from "./Components/Components";
import Submit from "./Submit/Submit";
import { withRouter } from "react-router-dom";
import { useStore } from "store/index";
import withError from "HOC/withError";

const Dashboard = (props) => {
  const dispatch = useStore(false)[1];

  React.useEffect(() => {
    (async () => {
      const quotationId = props.match.params.id;
      dispatch("START_LOADING");
      dispatch("GET_QUOTATION_DATA", { quotationId });
    })();
    return () => {
      dispatch("RESET_QUOTATION");
    };
  }, [props.match.params.id, dispatch]);

  return (
    <>
      <GridContainer>
        <GridItem xs={12} sm={12} md={5}>
          <UserData />
        </GridItem>
        <GridItem xs={12} sm={12} md={7}>
          <Pricing />
        </GridItem>
      </GridContainer>
      <GridContainer>
        <Components quotationId={props.match.params.id} />
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Charts />
        </GridItem>
      </GridContainer>
      {props.match.params.status !== "enviada" && (
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Submit />
          </GridItem>
        </GridContainer>
      )}
    </>
  );
};

export default withRouter(withError(Dashboard));
