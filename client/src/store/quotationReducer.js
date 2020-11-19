import { initStore } from "./index";
import axios from "axios-instance";

const initialState = {
  Quotation: {
    consumo: null,
    unidadConsumo: "",
    cantidadConsumo: 0,
    periodo: "",
    mesesFinanciamiento: null,
    step: 0,
    cotSucceeded: false,
  },
};

const configureQuotationReducer = () => {
  const actions = {
    TYPE_CONSUMPTION: (cb, globalState, payload) => {
      cb({
        Quotation: {
          ...globalState.Quotation,
          consumo: payload,
          step: globalState.Quotation.step + 1,
        },
      });
    },
    DATA_CONSUMPTION: async (cb, globalState, payload) => {
      // const consumo = globalState.Quotation.consumo;
      // const unidadConsumo = payload.unidadConsumo;
      const consumption = payload.credentials.consumption;
      // const periodo = payload.periodo;
      // const mesesFinanciamiento = payload.mesesFinanciamiento;
      console.log(payload);
      try {
        const res = await axios.post("/quotation/quotation-slim", {
          consumption,
        });

        console.log(res?.data);
        const TOTAL = (+res.data.TOTAL.split("$")[1]
          .split(",")
          .join("")).toFixed(2);
        const HITCH = (TOTAL * 0.2).toFixed(2);
        const MONTH = (TOTAL / 12).toFixed(2);
        const SAVING = (MONTH * 0.15 * 12).toFixed(2);
        cb(
          {
            Quotation: {
              consumption,
              HITCH,
              MONTH,
              SAVING,
              TOTAL,
              step: globalState.Quotation.step + 1,
            },
            errors: [],
            success: true,
            error: false,
          },
          true
        );
      } catch (e) {
        console.log(e);
        const currentStep = globalState.Quotation.step;
        const errorStep = 5;
        cb({
          Quotation: {
            ...globalState.Quotation,
            step: e?.response?.data?.errors ? currentStep : errorStep,
          },
          errors: e?.response?.data?.errors || [],
          success: false,
          error: true,
        });
      }
    },
    QUOTATION_FULL: async (cb, globalState, payload) => {
      const consumption = globalState.Quotation.consumption;

      const consumptions = [];
      for (let i = 1; i <= 6; i++) {
        consumptions.push({
          num_measure: 1,
          kw: consumption,
          cost: consumption,
        });
      }

      try {
        const result = await axios.post("/quotation/add-quotation", {
          consumptions,
          ...payload.credentials,
        });

        console.log(result.data);
        cb(
          {
            Quotation: {
              ...initialState,
              step: globalState.Quotation.step + 1,
            },
            errors: [],
            success: true,
            error: false,
          },
          true
        );
      } catch (e) {
        cb({
          errors:
            "response" in e
              ? e.response.data.errors
                ? e.response.data.errors
                : []
              : [],
          success: false,
          error: true,
        });
      }
    },
    ADD_QUOTATION: async (cb, globalState, payload) => {
      const tableData = [
        ...payload.consumptions.map((i) => {
          return { ...i };
        }),
      ];
      const { name, lastname, email, phone } = payload.credentials;
      const consumptions = tableData.map((cs) => {
        delete cs.tableData;
        delete cs.edited;
        return cs;
      });

      try {
        const res = await axios.post("/quotation/add-quotation", {
          name: name + " " + lastname,
          email,
          phone,
          consumptions,
        });

        console.log(res);
        cb({
          success: true,
          error: false,
        });
      } catch (e) {
        cb({
          errors:
            "response" in e
              ? e.response.data.errors
                ? e.response.data.errors
                : []
              : [],
          success: false,
          error: true,
        });
      }
    },
    ASSIGN_QUOTATION: async (_cb, _globalState, payload) => {
      const quotationId = payload.quotationId;
      const seller = payload.seller;
      try {
        await axios.put(`/quotation/assign/${quotationId}`, { seller });
        payload.transactionSuccess({ quotationId, seller, status: "ASIGNADO" });
      } catch (e) {
        payload.transactionFailed();
      }
    },
    DELETE_ASSIGNATION: async (_cb, _globalState, payload) => {
      const quotationId = payload.quotationId;
      try {
        await axios.put(`/quotation/assign-cancel/${quotationId}`);
        payload.transactionSuccess({
          quotationId,
          seller: "admin@root.com",
          status: "PENDIENTE",
        });
      } catch (e) {
        payload.transactionFailed();
      }
    },
    BACK: (cb, globalState) => {
      cb({
        Quotation: {
          ...globalState.Quotation,
          step: globalState.Quotation.step - 1,
        },
      });
    },
    NEXT: (cb, globalState) => {
      cb({
        Quotation: {
          ...globalState.Quotation,
          step: globalState.Quotation.step + 1,
        },
      });
    },
    RESET_STEPS: (cb, globalState) => {
      cb({
        Quotation: {
          ...globalState.Quotation,
          step: 0,
        },
      });
    },
  };

  initStore(actions, initialState);
};

export default configureQuotationReducer;
