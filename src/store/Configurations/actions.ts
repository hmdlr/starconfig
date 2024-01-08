import { createAsyncThunk } from "@reduxjs/toolkit";
import { scanphishApiClient } from "../../hooks/useClient";
import { IBrand, IConfig } from "@hmdlr/types";

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

export const fetchConfigurationsAction = createAsyncThunk(
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
  async (args: { id: IConfig["id"]; name: IConfig["name"] }, thunkAPI) => {
    try {
      // TODO: implement updateConfig
      // @ts-ignore
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
      // TODO: implement removeRulesetsFromConfig
      // @ts-ignore
      await scanphishApiClient.removeRulesetsFromConfig(args.configId, [
        args.brand.id,
      ]);
      return { configId: args.configId, brandId: args.brand.id };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);
