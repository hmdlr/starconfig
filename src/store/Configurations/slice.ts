import { ConfigurationsState } from "./types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ConfigModel } from "../../models/ConfigModel";

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
});
