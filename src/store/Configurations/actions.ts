import { createAsyncThunk } from "@reduxjs/toolkit";

import { IBrand, IConfig, IConfigUpdatePayload } from "@hmdlr/types";

import { scanphishApiClient } from "../../hooks/useClient";
import { toConfigModel } from "../../models/ConfigModel";

export const fetchConfigurationByIdAction = createAsyncThunk(
  "configurations/fetchConfigurationById",
  async (id: string, thunkAPI) => {
    try {
      const config = await scanphishApiClient.getConfig(id);

      const presets = await scanphishApiClient.listPresets();

      // @ts-ignore
      return toConfigModel(config, presets, config.belongingGroupId ?? "");
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

export const setConfigurationActiveAction = createAsyncThunk(
  "configurations/setActiveConfiguration",
  async (arg: { id: string; active: boolean }, thunkAPI) => {
    try {
      if (arg.active) {
        await scanphishApiClient.savePreset(arg.id);
      } else {
        await scanphishApiClient.deletePreset(arg.id);
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);
