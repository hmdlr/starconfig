import { createAsyncThunk } from "@reduxjs/toolkit";
import { scanphishApiClient } from "../../hooks/useClient";
import { IBrand, IConfig, IConfigUpdatePayload } from "@hmdlr/types";

export const fetchConfigurationByIdAction = createAsyncThunk(
  "configurations/fetchConfigurationById",
  async (id: string, thunkAPI) => {
    try {
      return await scanphishApiClient.getConfig(id);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

export const fetchAllConfigurationsAction = createAsyncThunk(
  "configurations/fetchConfigurations",
  async (_, thunkAPI) => {
    try {
      return await scanphishApiClient.listConfigs({});
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

export const updateConfigurationNameAction = createAsyncThunk(
  "configurations/updateConfigurationName",
  async (args: IConfigUpdatePayload, thunkAPI) => {
    try {
      return await scanphishApiClient.updateConfig(args);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

export const addBrandToConfigurationAction = createAsyncThunk(
  "configurations/addBrandToConfiguration",
  async (args: { configId: IConfig["id"]; brand: IBrand }, thunkAPI) => {
    try {
      await scanphishApiClient.addRulesetsToConfig(args.configId, [
        args.brand.id,
      ]);
      return { configId: args.configId, brand: args.brand };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

export const removeBrandFromConfigurationAction = createAsyncThunk(
  "configurations/removeBrandFromConfiguration",
  async (args: { configId: IConfig["id"]; brand: IBrand }, thunkAPI) => {
    try {
      await scanphishApiClient.removeBrandsFromConfig(args.configId, [
        args.brand.id,
      ]);
      return { configId: args.configId, brandId: args.brand.id };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);
