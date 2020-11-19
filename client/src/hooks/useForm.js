import { useState, useEffect, useCallback } from "react";
import { useStore } from "../store/index";
let mounted = true;
export const useForm = (formControls, action, payload) => {
  const onChange = (e, sliderCase) => {
    const name = e.target?.name || "";
    const value = e.target?.value || "";

    setForm((prevForm) => {
      const newForm = { ...prevForm };

      if (typeof sliderCase === "number") newForm[e].value = sliderCase;
      else newForm[name].value = value;

      return newForm;
    });
  };

  const [loading, setLoading] = useState(false);

  const [state, dispatch] = useStore();
  const [form, setForm] = useState(() => {
    const formFormatted = {};
    formControls.forEach((formControl) => {
      formFormatted[formControl] = {
        helperText: null,
        error: false,
        value: "",
        onChange,
      };
    });
    return formFormatted;
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const credentials = {};
    for (let key in form) credentials[key] = form[key].value;
    if (!payload) dispatch(action, { credentials, dispatch });
    else dispatch(action, { credentials, ...payload, dispatch });
  };

  const resetFields = useCallback(() => {
    setForm((prevForm) => {
      const restForm = { ...prevForm };
      Object.keys(restForm).map((key) => {
        restForm[key].value = "";
        restForm[key].error = false;
        restForm[key].helperText = null;
        return key;
      });
      return restForm;
    });
  }, [setForm]);

  useEffect(() => {
    setLoading(false);
    if (mounted) {
      if (state.success) {
        resetFields();
        dispatch("CLEAR_ERRORS");
      }
    }
  }, [dispatch, state.success, state.error, resetFields]);

  useEffect(() => {
    setLoading(false);
    if (state.errors.length > 0) {
      dispatch("CLEAR_ERROR_ARRAY");
      setForm((prevForm) => {
        const newFormWithErrors = { ...prevForm };
        for (let key in newFormWithErrors)
          newFormWithErrors[key] = {
            ...prevForm[key],
            helperText: "",
            error: false,
          };
        const errors = state.errors;
        errors.forEach((error) => {
          newFormWithErrors[error.param] = {
            ...newFormWithErrors[error.param],
            value: prevForm[error.param].value,
            helperText: error.msg,
            error: true,
          };
        });
        return newFormWithErrors;
      });
    } else if (!state.error) resetFields();
  }, [state.errors, dispatch, resetFields, state.error]);

  const updateAll = useCallback((newState) => {
    setForm((prevForm) => {
      const newForm = { ...prevForm };
      for (let key in newState)
        newForm[key] = {
          ...prevForm[key],
          helperText: "",
          error: false,
          value: newState[key],
        };
      return newForm;
    });
  }, []);

  //Ensure the defaults states for success and error
  useEffect(() => {
    mounted = true;
    dispatch("CLEAR_ERRORS");
    return () => {
      mounted = false;
    };
  }, [dispatch]);

  return {
    form,
    loading,
    success: state.success,
    onSubmit,
    onChange,
    updateAll,
    state,
    resetFields,
    dispatch,
  };
};
