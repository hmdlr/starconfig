import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { ConfigModel } from "../../models/ConfigModel";
import {
  addBrandToConfigurationAction,
  fetchConfigurationByIdAction,
  removeBrandFromConfigurationAction,
  setConfigurationActiveAction,
  updateConfigurationNameAction,
} from "./actions";
import { ConfigurationsState } from "./types";

const initialState: ConfigurationsState = {
  configurations: [],
  pagination: {
    total: 0,
  },
  privateConfigurations: {
    items: [],
    count: 0,
  },
  publicConfigurations: {
    items: [],
    count: 0,
  },
};

export const configurationsSlice = createSlice({
  name: "Configurations",
  initialState,
  reducers: {
    setConfigurations: (state, action: PayloadAction<ConfigModel[]>) => {
      state.configurations = action.payload;
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(fetchAllConfigurationsAction.fulfilled, (state, action) => {
    //   const mappedConfigurations = action.payload.items.map((config) => toConfigModel(config));
    // });
    //
    builder.addCase(fetchConfigurationByIdAction.fulfilled, (state, action) => {
      const configIndex = state.configurations.findIndex(
        (config) => config.id === action.payload.id,
      );

      if (configIndex !== -1) {
        state.configurations[configIndex] = action.payload;
      } else {
        state.configurations.push(action.payload);
      }
    });

    builder.addCase(
      updateConfigurationNameAction.fulfilled,
      (state, action) => {
        const configIndex = state.configurations.findIndex(
          (config) => config.id === action.meta.arg.id,
        );

        if (configIndex !== -1) {
          state.configurations[configIndex].name = action.meta.arg.name;
        }
      },
    );

    builder.addCase(
      addBrandToConfigurationAction.fulfilled,
      (state, action) => {
        const configIndex = state.configurations.findIndex(
          (config) => config.id === action.payload.configId,
        );

        if (configIndex === -1) {
          return;
        }

        const brandAlreadyInConfig = state.configurations[
          configIndex
        ].brands.find((brand) => brand.id === action.payload.brand.id);

        if (brandAlreadyInConfig) {
          return;
        }

        state.configurations[configIndex].brands.push(action.payload.brand);
      },
    );

    builder.addCase(
      removeBrandFromConfigurationAction.fulfilled,
      (state, action) => {
        const configIndex = state.configurations.findIndex(
          (config) => config.id === action.payload.configId,
        );

        if (configIndex !== -1) {
          state.configurations[configIndex].brands = state.configurations[
            configIndex
          ].brands.filter((brand) => brand.id !== action.payload.brandId);
        }
      },
    );

    builder.addCase(setConfigurationActiveAction.fulfilled, (state, action) => {
      const configIndex = state.configurations.findIndex(
        (config) => config.id === action.meta.arg.id,
      );

      if (configIndex !== -1) {
        state.configurations[configIndex].active = action.meta.arg.active;
      }
    });
  },
});
