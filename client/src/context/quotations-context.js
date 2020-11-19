import React, { useState, useEffect } from "react";
import { useStore } from "store/index";
import { authAxios } from "store/authReducer";

export const QuotationsContext = React.createContext({
  activeQuotations: [],
  dispatchedQuotations: [],
  sellers: [],
  role: "",
  loading: true,
  changeSeller: () => {},
  assignQuotation: () => {},
});

export default (props) => {
  const state = useStore()[0];
  const [loading, setLoading] = useState(true);
  const [activeQuotations, setActiveQuotations] = useState([]);
  const [dispatchedQuotations, setDispatchedQuotations] = useState([]);
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    authAxios
      .get(`/quotation/quotations/${state.auth.email}`)
      .then((res) => {
        setLoading(false);
        const active = [];
        const sent = [];
        res.data.quotations.forEach((r) =>
          r.status === "PENDIENTE" ? active.push(r) : sent.push(r)
        );
        if (state.auth.role === "admin") setSellers(res.data.sellers);
        setActiveQuotations(active);
        setDispatchedQuotations(sent);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  }, [state.auth.email, state.auth.role]);

  const changeSeller = () => {};

  const assignQuotation = () => {};

  return (
    <QuotationsContext.Provider
      value={{
        loading,
        activeQuotations,
        dispatchedQuotations,
        sellers,
        role: state.auth.role,
        changeSeller,
        assignQuotation,
      }}
    >
      {props.children}
    </QuotationsContext.Provider>
  );
};
