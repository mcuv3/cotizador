import React, { useState, useEffect } from "react";
import axios from "axios-instance";
import Snackbar from "@material-ui/core/Snackbar";

import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default (WrappedComponent) => {
  return ({ ...props }) => {
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("Ocurrió un error");

    const errorTrigger = (msg, trigger) => {
      setErrorMessage(msg);
      trigger && setError(true);
    };

    useEffect(() => {
      const req = axios.interceptors.request.use((req) => {
        return req;
      });
      const res = axios.interceptors.response.use(
        (res) => {
          setSuccess(true);
          return res;
        },
        (error) => {
          setError(true);
          return Promise.reject(error);
        }
      );

      return () => {
        axios.interceptors.request.eject(req);
        axios.interceptors.response.eject(res);
      };
    }, []);
    return (
      <>
        <Snackbar
          open={success}
          autoHideDuration={1800}
          onClose={() => setSuccess(false)}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert severity="success">Operación Exitosa</Alert>
        </Snackbar>
        <Snackbar
          open={error}
          autoHideDuration={1800}
          onClose={() => setError(false)}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert severity="error">{errorMessage}</Alert>
        </Snackbar>
        <WrappedComponent {...props} triggerError={errorTrigger} />
      </>
    );
  };
};
