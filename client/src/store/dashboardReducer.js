import { initStore } from "./index";
import axios from "axios-instance";
import download from "downloadjs";

export const INVERSOR = "inversor";
export const SOLAR_PANEL = "solar_panel";
export const MOUNTING_SYSTEM = "mounting_system";
export const COMPONENT_CONSTANT = "component_constant";
const initialState = {
  dashboard: {
    quotation: null,
    date: new Date(),
    qty: 1,
    userData: {
      id: "",
      name: "",
      email: "",
      phone: "",
    },
    components: {
      inversor: { id: "", qty: 0 },
      solar_panel: { id: "", qty: 0 },
      mounting_system: [{ id: "", qty: 0 }],
      component_constant: [
        { id: "", qty: 0 },
        { id: "", qty: 0 },
      ],
    },
    configurations: {
      MAX_INVERSOR: 0.0,
      MIN_INVERSOR: 0.0,
      MAX_PANEL: 0.0,
      MIN_PANEL: 0.0,
    },
    quotation_number: null,
    branchId: 0,
    branchName: "",
    consumptions: [],
    work_force: { percentage: "", total: 0 },
    percentage_iva: 0,
    sub_total: 0,
    iva: 0,
    total: 0,
    quotation_sent: false,
  },
};

const calculationResults = (res) => {
  return {
    work_force: {
      percentage: res.data.WORKFORCE_PERCENTAGE,
      total: res.data.WORKFORCE,
    },
    configurations: {
      MAX_INVERSOR: res.data.configurations.MAX_INVERSOR,
      MIN_INVERSOR: res.data.configurations.MIN_INVERSOR,
      MAX_PANEL: res.data.configurations.MAX_PANEL,
      MIN_PANEL: res.data.configurations.MIN_PANEL,
    },
    percentage_iva: res.data.IVA_PERCENTAGE,
    sub_total: res.data.SUB_TOTAL,
    total: res.data.TOTAL,
    iva: res.data.IVA,
  };
};

const configureDashboard = () => {
  const actions = {
    GET_QUOTATION_DATA: async (cb, globalState, payload) => {
      const quotationId = payload.quotationId;
      try {
        const res = await axios.get(`quotation/${quotationId}`);
        const quotationDetails = res.data.quotationDetails;
        const branches = globalState.components.branch;
        const quotation_number = res.data.quotationData.qto_number;
        const branchId = res.data.quotationData.branch_id;
        const isAdmin = globalState.auth.role === "admin";
        const thereIsAnyComponentDetail =
          Object.keys(quotationDetails).length > 0;
        console.log(res.data);
        let components = {};

        if (thereIsAnyComponentDetail) {
          for (const key in quotationDetails) {
            if (key === "inversor" || key === "solar_panel")
              components[key] = quotationDetails[key][0];
            else components[key] = quotationDetails[key];
          }
        } else
          components = {
            inversor: {
              component_id: globalState.components.inversor[0].id,
              qty: 1,
            },
            solar_panel: {
              component_id: globalState.components.solar_panel[0].id,
              qty: 1,
            },
            mounting_system: [
              {
                component_id: globalState.components.mounting_system[0].id,
                qty: 1,
              },
            ],
            component_constant: [
              {
                component_id: globalState.components.component_constant[0].id,
                qty: 1,
              },
              {
                component_id: globalState.components.component_constant[1].id,
                qty: 1,
              },
            ],
          };

        cb({
          dashboard: {
            ...globalState.dashboard,
            quotation: res.data.quotationData.quotation,
            date: res.data.quotationData.date,
            quotation_number,
            qty: 1,
            userData: {
              id: res.data.quotationData.id,
              name: res.data.quotationData.name,
              email: res.data.quotationData.email,
              phone: res.data.quotationData.phone,
            },
            components,
            branchId: isAdmin ? branchId || branches[0].id : 1,
            branchName: !branchId
              ? branches[0].branch
              : branches.find((b) => b.id === branchId).branch,
            consumptions: res.data.consumptions,
            ...calculationResults(res),
          },

          loading: false,
        });
      } catch (e) {
        console.log(e);
        cb({
          loading: false,
        });
      }
    },
    SEND_QUOTATION: async (cb, globalState, payload) => {
      const isAdmin = globalState.auth.role === "admin";
      try {
        const quotationId = globalState.dashboard.quotation;
        await axios.post("/quotation/send", {
          quotation_id: quotationId,
          branch: isAdmin
            ? globalState.dashboard.branchName
            : globalState.auth.branch,
          isSent: true,
          save: true,
          userData: globalState.dashboard.userData,
          components: {
            inversor: [globalState.dashboard.components.inversor],
            solar_panel: [globalState.dashboard.components.solar_panel],
            mounting_system: globalState.dashboard.components.mounting_system,
            component_constant:
              globalState.dashboard.components.component_constant,
          },
        });
        cb({
          dashboard: {
            ...globalState.dashboard,
            quotation_sent: true,
          },
          loading: false,
        });
      } catch (e) {
        console.log(e);
        cb({
          dashboard: {
            ...globalState.dashboard,
            quotation_sent: false,
          },
          loading: false,
        });
      }
    },
    DOWNLOAD_QUOTATION: async (cb, globalState) => {
      try {
        const res = await axios.get(
          `quotation/download/${globalState.dashboard.quotation}`,
          {
            responseType: "blob",
          }
        );

        const qto_number = globalState.dashboard.quotation_number;
        const quotation = globalState.dashboard.quotation;
        const branch = globalState.dashboard.branchName.slice(0, 3);

        const content = res.headers["content-type"];
        download(res.data, `${branch}-${quotation}-${qto_number}.pdf`, content);

        cb({
          loading: false,
        });
      } catch (e) {
        console.log(e);
        cb({
          loading: false,
        });
      }
    },
    SET_CITY: (cb, globalState, payload) => {
      const branchId = payload;
      const branch = globalState.components.branch.find(
        (b) => b.id === branchId
      );
      console.log(branch.branch);

      cb({
        dashboard: {
          ...globalState.dashboard,
          branchId,
          branchName: branch?.branch,
        },
      });
    },
    CHANGE_COMPONENT: (cb, globalState, payload) => {
      const componentKind = payload.kind;
      const componentId = payload.component_id;
      const qty = payload.qty >= 0 ? payload.qty : 0;
      const index = payload.index;
      let newComponents;

      if (index >= 0) {
        newComponents = globalState.dashboard.components[componentKind].map(
          (c, ind) => {
            if (ind === index) return { component_id: componentId, qty };
            return c;
          }
        );
      } else {
        newComponents = { component_id: componentId, qty };
      }
      cb({
        dashboard: {
          ...globalState.dashboard,
          components: {
            ...globalState.dashboard.components,
            [componentKind]: newComponents,
          },
        },
      });
    },
    GET_CALC__SAVE_COMP: async (cb, globalState, payload) => {
      const wantToSave = payload?.wantToSave;
      const quotationId = globalState.dashboard.quotation;
      let endpoint = "quotation/calculation";
      if (wantToSave) endpoint = "quotation/save-components";

      try {
        const res = await axios.patch(endpoint, {
          quotation_id: wantToSave ? quotationId : null,
          save: wantToSave ? true : false,
          components: {
            inversor: [globalState.dashboard.components.inversor],
            solar_panel: [globalState.dashboard.components.solar_panel],
            mounting_system: globalState.dashboard.components.mounting_system,
            component_constant:
              globalState.dashboard.components.component_constant,
          },
        });
        console.log(res.data);
        cb({
          dashboard: {
            ...globalState.dashboard,
            ...calculationResults(res),
          },
          loading: false,
        });
      } catch (e) {
        cb({
          loading: false,
        });
      }
    },
    ADD_MOUNTING: (cb, globalState) => {
      const mtn = globalState.dashboard.components.mounting_system;
      mtn.push({ id: globalState.components.mounting_system[0].id, qty: 1 });
      cb({
        dashboard: {
          ...globalState.dashboard,
          components: {
            ...globalState.dashboard.components,
            mounting_system: mtn,
          },
        },
      });
    },
    REMOVE_MOUNTING: (cb, globalState) => {
      const mtn = globalState.dashboard.components.mounting_system;
      mtn.pop();
      cb({
        dashboard: {
          ...globalState.dashboard,
          components: {
            ...globalState.dashboard.components,
            mounting_system: mtn,
          },
        },
      });
    },
    RESET_QUOTATION: (cb, globalState) => {
      cb({
        dashboard: {
          ...globalState.dashboard,
          quotation_sent: false,
        },
      });
    },
  };

  initStore(actions, initialState);
};

export default configureDashboard;
