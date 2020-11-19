import { useState, useEffect, useCallback } from "react";

let globalState = {
  errors: [],
  success: false,
  error: false,
  loading: true,
};

let listeners = [];
let actions = {
  CLEAR_ERRORS: (cb, globalState) => {
    cb({
      ...globalState,
      errors: [],
      success: false,
      error: false,
    });
  },
  CLEAR_ERROR_ARRAY: (cb, globalState) => {
    cb({
      ...globalState,
      errors: [],
    });
  },
  START_LOADING: (cb, globalState) => {
    cb({
      ...globalState,
      loading: true,
    });
  },
  END_LOADING: (cb, globalState) => {
    cb({
      ...globalState,
      loading: false,
    });
  },
};

export const useStore = (shouldListen = true) => {
  const setState = useState()[1];

  const dispatch = useCallback(
    (action, payload) => {
      actions[action](
        (newState, willUnmount) => {
          globalState = {
            ...globalState,
            ...newState,
          };

          for (const listener of listeners) {
            if (listener === setState && !willUnmount) {
              listener(globalState);
            } else listener(globalState);
          }
        },
        globalState,
        payload
      );
    },
    [setState]
  );

  useEffect(() => {
    if (shouldListen) listeners.unshift(setState);
    return () => {
      if (shouldListen) listeners = listeners.filter((lis) => lis !== setState);
    };
  }, [setState, shouldListen]);

  return [globalState, dispatch];
};

export const initStore = (actionsReducer, initialState) => {
  if (initialState)
    globalState = {
      ...globalState,
      ...initialState,
    };
  actions = {
    ...actions,
    ...actionsReducer,
  };
};
