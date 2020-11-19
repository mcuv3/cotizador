export const actions = {
  SET_QUOTATIONS: "SET_QUOTATIONS",
  ASSIGNATION_SUCCESS: "ASSIGNATION_SUCCESS",
  CHANGE_PAGE: "CHANGE_PAGE",
  ADD_QUOTATIONS: "ADD_QUOTATIONS",
};

export const initialState = {
  grpActive: 0,
  grpSent: 0,
  activeQuotations: [[]],
  sentQuotations: [[]],
  maxActivePages: 0,
  maxSentPages: 0,
  pageActiveLimit: 0,
  pageSentLimit: 0,
  pageActive: 1,
  pageSent: 1,
  sellers: [],
};

const setQuotationsHandler = (
  state,
  { activeQuotations, sellers, sentQuotations, maxActivePages, maxSentPages }
) => {
  const maxActive = activeQuotations?.length;
  const maxSent = sentQuotations?.length;
  const shouldAddMorePaginationActive = maxActive / maxActivePages < 1;
  const shouldAddMorePaginationSent = maxSent / maxSentPages < 1;

  return {
    ...state,
    pageActiveLimit:
      (shouldAddMorePaginationActive ? maxActive + 1 : maxActivePages) || 0,
    pageSentLimit:
      (shouldAddMorePaginationSent ? maxSent + 1 : maxSentPages) || 0,
    activeQuotations,
    maxActivePages,
    maxSentPages,
    sentQuotations,
    sellers: sellers || [],
  };
};

const assignationSuccess = (state, { status, seller, quotationId }) => {
  const activeQuotations = [...state.activeQuotations];

  const newActiveQuotations = activeQuotations[state.pageActive - 1].map(
    (qto) => {
      if (qto.quotation === quotationId) {
        qto.status = status;
        qto.admin = seller;
      }
      return qto;
    }
  );
  activeQuotations[state.pageActive - 1] = newActiveQuotations;

  return {
    ...state,
    activeQuotations: activeQuotations,
  };
};

const changePageHandler = (state, { page, isActiveQuotations }) => {
  const newState = { ...state };
  if (isActiveQuotations) newState.pageActive = page;
  else newState.pageSent = page;
  return newState;
};

const addQuotationsHandler = (state, { group, qto_kind, extraQuotations }) => {
  const maxCurrentQtsPages = state[qto_kind].length; // 0 ARRAY START   ==> PAGE START 1
  let maxNextQtsPages = state[qto_kind].length + extraQuotations.length;
  let limitPageMax = "maxSentPages";
  let limitPage = "pageSentLimit";
  let grpQto = "grpSent";
  let page = "pageSent";
  if (qto_kind === "activeQuotations") {
    limitPageMax = "maxActivePages";
    limitPage = "pageActiveLimit";
    grpQto = "grpActive";
    page = "pageActive";
  }
  const shouldAddMorePagination = maxNextQtsPages / state[limitPageMax] < 1;
  return {
    ...state,
    [limitPage]: shouldAddMorePagination
      ? maxNextQtsPages + 1
      : state[limitPageMax],
    [qto_kind]: [...state[qto_kind], ...extraQuotations],
    [grpQto]: group,
    [page]:
      maxCurrentQtsPages + (maxNextQtsPages > maxCurrentQtsPages + 1 ? 1 : 0),
  };
};

export default (state, action) => {
  switch (action.type) {
    case actions.SET_QUOTATIONS:
      return setQuotationsHandler(state, action.qtoResponse);
    case actions.ASSIGNATION_SUCCESS:
      return assignationSuccess(state, action.newQuotationInfo);
    case actions.CHANGE_PAGE:
      return changePageHandler(state, { ...action });
    case actions.ADD_QUOTATIONS:
      return addQuotationsHandler(state, { ...action });
    default:
      return state;
  }
};
