import { ConfigurationsState } from "./types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ConfigModel } from "../../models/ConfigModel";
import {
  addBrandToConfigurationAction,
  fetchConfigurationByIdAction,
  removeBrandFromConfigurationAction,
  updateConfigurationNameAction,
} from "./actions";

const initialState: ConfigurationsState = {
  configurations: [],
  pagination: {
    total: 0,
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
    builder.addCase(fetchConfigurationByIdAction.fulfilled, (state, action) => {
      const configAlreadyExists = state.configurations.find(
        (config) => config.id === action.payload.id,
      );

      if (!configAlreadyExists) {
        // TODO: map the response to a ConfigModel
        // state.configurations.push(action.payload);
      }
    });

    builder.addCase(
      updateConfigurationNameAction.fulfilled,
      (state, action) => {
        const configIndex = state.configurations.findIndex(
          (config) => config.id === action.payload.id,
        );

        if (configIndex !== -1) {
          state.configurations[configIndex].name = action.payload.name;
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
