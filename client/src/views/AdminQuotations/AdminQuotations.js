import React, { useEffect, useState, useReducer } from "react";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import ActiveQuotations from "./ActiveQuotations/ActiveQuotations";
import SentQuotations from "./SentQuotations/SentQuotations";
import { logOut } from "store/authReducer";
import axiosIns from "axios-instance";
import { useStore } from "store/index";
import { makeStyles } from "@material-ui/core";
import withError from "HOC/withError";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle";
import CircularProgress from "@material-ui/core/CircularProgress";
import adminReducer, { actions, initialState } from "./AdminReducer";
import axios from "axios";

const useStyles = makeStyles(styles);

const AdminQuotations = () => {
  const [stateReducer, dispatchReducer] = useReducer(
    adminReducer,
    initialState
  );
  const [state, dispatch] = useStore();
  const [loading, setLoading] = useState(true);
  const classes = useStyles();
  useEffect(() => {
    const source = axios.CancelToken.source();
    (async () => {
      const res = await axiosIns.get(
        `/quotation/quotations/${state.auth.email}/0`,
        {
          cancelToken: source.token,
        }
      );
      try {
        setLoading(false);
        dispatchReducer({
          type: actions.SET_QUOTATIONS,
          qtoResponse: {
            activeQuotations: res.data.activeQuotations,
            sentQuotations: res.data.sentQuotations,
            maxActivePages: res.data.maxActivePages,
            maxSentPages: res.data.maxSentPages,
            sellers: res.data.sellers,
            role: state.auth.role,
          },
        });
      } catch (e) {
        console.log(e.response.data);
        const errorMessage = e.response.data.message;
        if (
          errorMessage === "jwt expired" ||
          errorMessage === "invalid signature"
        )
          logOut(0);
        setLoading(false);
      }
    })();
    return () => {
      source.cancel("Component got unmounted");
    };
  }, [state.auth.email, state.auth.role]);

  const fetchQuotations = async (email, qto_kind, group) => {
    setLoading(true);
    const res = await axiosIns.put("/quotation/quotations/slim", {
      admin: email,
      kind: qto_kind,
      group,
    });
    try {
      dispatchReducer({
        type: actions.ADD_QUOTATIONS,
        extraQuotations: res.data.extraQuotations,
        group,
        qto_kind,
      });
    } catch (e) {
      console.log(e.response.data);
      if (
        e.response.data.message === "jwt expired" ||
        e.response.message === "jwt expired"
      )
        logOut(0);
    } finally {
      setLoading(false);
    }
  };

  const assignQuotationStart = (seller, quotationId) => {
    setLoading(true);
    dispatch("ASSIGN_QUOTATION", {
      seller,
      quotationId,
      transactionSuccess,
      transactionFailed,
    });
  };

  const transactionSuccess = (payload) => {
    setLoading(false);
    dispatchReducer({
      type: actions.ASSIGNATION_SUCCESS,
      newQuotationInfo: { ...payload },
    });
  };
  const transactionFailed = () => setLoading(false);

  const cancelAssignedQuotationStart = (quotationId) => {
    setLoading(true);
    dispatch("DELETE_ASSIGNATION", {
      quotationId,
      transactionSuccess,
      transactionFailed,
    });
  };

  const paginationChangeHandler = (page, isActiveQuotations) => {
    if (isActiveQuotations) {
      if (
        (stateReducer.maxActivePages === page ||
          stateReducer.pageActiveLimit === page) &&
        !stateReducer.activeQuotations[page]
      )
        fetchQuotations(
          state.auth.email,
          "activeQuotations",
          stateReducer.grpActive + 1
        );
      else if (page !== stateReducer.pageActive)
        dispatchReducer({
          type: actions.CHANGE_PAGE,
          page,
          isActiveQuotations,
        });
    } else {
      if (
        (stateReducer.maxSentPages === page ||
          stateReducer.pageSentLimit === page) &&
        !stateReducer.sentQuotations[page]
      )
        fetchQuotations(
          state.auth.email,
          "sentQuotations",
          stateReducer.grpSent + 1
        );
      else if (page !== stateReducer.pageSent)
        dispatchReducer({
          type: actions.CHANGE_PAGE,
          page,
          isActiveQuotations,
        });
    }
  };

  return (
    <>
      <GridContainer>
        {loading && (
          <div className={classes.loadingForm}>
            <CircularProgress color="secondary" />
          </div>
        )}
        <GridItem xs={12} sm={12} md={12}>
          <ActiveQuotations
            active={stateReducer.activeQuotations[stateReducer.pageActive - 1]}
            role={state.auth.role}
            sellers={stateReducer.sellers}
            assign={assignQuotationStart}
            cancel={cancelAssignedQuotationStart}
            pagination={stateReducer.pageActiveLimit}
            paginationChange={paginationChangeHandler}
            pageActive={stateReducer.pageActive}
          />
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <SentQuotations
            sent={stateReducer.sentQuotations[stateReducer.pageSent - 1]}
            role={state.auth.role}
            pagination={stateReducer.pageSentLimit}
            paginationChange={paginationChangeHandler}
            pageActive={stateReducer.pageSent}
          />
        </GridItem>
      </GridContainer>
    </>
  );
};

export default withError(AdminQuotations);
