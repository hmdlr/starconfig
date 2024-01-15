import { ConfigurationsState } from "./types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ConfigModel, toConfigModel } from "../../models/ConfigModel";
import {
  addBrandToConfigurationAction,
  fetchAllConfigurationsAction,
  fetchConfigurationByIdAction,
  removeBrandFromConfigurationAction,
  updateConfigurationNameAction,
} from "./actions";

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
        state.configurations.push(toConfigModel(action.payload));
      } else {
        state.configurations.push(toConfigModel(action.payload));
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

        if (configIndex !== -1) {
          state.configurations[configIndex].brands.push(action.payload.brand);
        }
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
  },
});
