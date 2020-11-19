import { initStore } from "./index";
import { logOut } from "./authReducer";
import axios from "axios-instance";

const initialState = {
  components: {
    constant: [],
    inversor: [],
    solar_panel: [],
    mounting_system: [],
    component_constant: [],
    branch: [],
  },
};

const configureComponents = () => {
  const actions = {
    GET_COMPONENTS: async (cb) => {
      try {
        const components = await axios.get("/admin/components");
        cb({
          components: {
            constant: components.data.constant,
            inversor: components.data.inversor,
            solar_panel: components.data.solar_panel,
            mounting_system: components.data.mounting_system,
            component_constant: components.data.component_constant,
            branch: components.data.branch,
          },
        });
      } catch (e) {
        console.log(e);
        if (e?.response?.data?.message === "jwt expired") return logOut(0);
        cb({
          success: false,
          error: true,
        });
      }
    },
    ADD_COMPONENT: async (cb, globalState, payload) => {
      const component_kind = payload.component_kind;
      const component = payload.credentials;

      try {
        const result = await axios.post("/admin/component-add", {
          component,
          component_kind,
        });

        const newComponents = [...globalState.components[component_kind]];
        newComponents.push({
          ...component,
          cost: `$${component?.cost}`,
          id: result.data.id,
        });

        cb({
          components: {
            ...globalState.components,
            [component_kind]: newComponents,
          },
          success: true,
          error: false,
        });
      } catch (e) {
        cb({
          success: false,
          error: true,
        });
      }
    },
    UPDATE_COMPONENT: async (cb, globalState, payload) => {
      const component_kind = payload.component_kind;
      const component = payload.credentials;
      try {
        await axios.put("/admin/component-update", {
          component,
          component_kind,
        });

        const newComponents = globalState.components[component_kind].map(
          (com) => {
            if (com.id === component.id) return component;
            return com;
          }
        );
        cb({
          components: {
            ...globalState.components,
            [component_kind]: newComponents,
          },
          success: true,
          error: false,
        });
      } catch (e) {
        console.log(e);
        cb({
          success: false,
          error: true,
        });
      }
    },
    DELETE_COMPONENT: async (cb, globalState, payload) => {
      const id = payload.id;
      const component_kind = payload.component_kind;

      try {
        await axios.delete(`/admin/${component_kind}/${id.toString()}`);
        const newComponents = globalState.components[component_kind].filter(
          (c) => c.id !== id
        );
        cb({
          components: {
            ...globalState.components,
            [component_kind]: newComponents,
          },
          success: true,
          error: false,
        });
      } catch (e) {
        cb({
          success: false,
          error: true,
        });
      }
    },
  };

  initStore(actions, initialState);
};

export default configureComponents;
