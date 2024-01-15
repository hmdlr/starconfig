import { RootState } from "../store";
import { createSelector } from "@reduxjs/toolkit";
import { IConfig } from "@hmdlr/types";

export const selectConfigurationsState = (state: RootState) =>
  state.configurations;

export const selectConfigurations = createSelector(
  selectConfigurationsState,
  (state) => state.configurations,
);

export const selectConfigurationsList = createSelector(
  selectConfigurations,
  (configurations) =>
    Object.values(configurations)
      .map((configuration) => configuration.items)
      .flat(1),
);

export const selectConfigurationById = (id?: IConfig["id"]) =>
  createSelector(selectConfigurationsList, (configurations) => {
    if (!id) {
      return undefined;
    }

    return configurations.find((configuration) => configuration.id === id);
  });
