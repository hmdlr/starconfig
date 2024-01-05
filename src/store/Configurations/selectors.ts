import { RootState } from "../store";
import { createSelector } from "@reduxjs/toolkit";
import { IConfig } from "@hmdlr/types";

export const selectConfigurationsState = (state: RootState) =>
  state.configurations;

export const selectConfigurations = createSelector(
  selectConfigurationsState,
  (state) => state.configurations,
);

export const selectConfigurationById = (id?: IConfig["id"]) =>
  createSelector(selectConfigurations, (configurations) => {
    if (!id) {
      return undefined;
    }

    return configurations.find((configuration) => configuration.id === id);
  });
