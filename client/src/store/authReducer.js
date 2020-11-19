import { initStore } from "./index";
import axios from "axios-instance";

export const initialState = {
  auth: {
    token: null,
    email: null,
    role: null,
    branch: "",
  },
};

const configureAuth = () => {
  const actions = {
    LOG_IN: async (cb, globalState, payload) => {
      try {
        const result = await axios.post("/auth/login", {
          ...payload.credentials,
        });
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${result.data.token}`;

        sessionStorage.setItem("token", result.data.token);
        sessionStorage.setItem("email", result.data.email);
        sessionStorage.setItem("role", result.data.role);
        sessionStorage.setItem("branch", result.data.branch);
        console.log(payload.dispatch);
        logOut(result.data.expiresIn, payload.dispatch);
        console.log(result.data);
        cb(
          {
            auth: {
              token: result.data.token,
              email: result.data.email,
              role: result.data.role,
              branch: result.data.branch,
            },
            errors: [],
            success: true,
            error: false,
          },
          true
        );
      } catch (e) {
        console.log(e);
        cb({
          auth: {
            ...globalState.auth,
          },
          errors: e?.response?.data?.errors || [],
          success: false,
          error: true,
        });
      }
    },
    ADD_SELLER: async (cb, _globalState, payload) => {
      const sellerData = { ...payload };
      console.log(sellerData);
      try {
        await axios.post("/auth/add-seller", { ...payload.credentials });
        cb(
          {
            errors: [],
            success: true,
            error: false,
          },
          true
        );
      } catch (e) {
        cb({
          errors: e?.response?.data?.errors || [],
          success: false,
          error: true,
        });
      }
    },
    LOG_OUT: (cb) => {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("email");
      sessionStorage.removeItem("role");
      sessionStorage.removeItem("branch");
      cb({
        auth: initialState,
      });
    },
    CHECK_CREDENTIALS: (cb, _globalState, payload) => {
      const { dispatch } = payload;
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${sessionStorage.getItem("token")}`;

      if (sessionStorage.getItem("token")) dispatch("GET_COMPONENTS");

      cb({
        auth: {
          token: sessionStorage.getItem("token"),
          email: sessionStorage.getItem("email"),
          role: sessionStorage.getItem("role"),
          branch: sessionStorage.getItem("branch"),
          errors: null,
        },
      });
    },
  };

  initStore(actions, initialState);
};

export const logOut = (time, dispatch) => {
  setTimeout(() => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("role");
    dispatch("LOG_OUT");
  }, time * 1000);
};

export default configureAuth;
