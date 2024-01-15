import { createAsyncThunk } from "@reduxjs/toolkit";
import { authphishApiClient, scanphishApiClient } from "../../hooks/useClient";
import { IBrand, IConfig, IConfigUpdatePayload, UUID } from "@hmdlr/types";
import { toConfigModel } from "../../models/ConfigModel";

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

export const fetchPrivateConfigurationsAction = createAsyncThunk(
  "configurations/fetchConfigurations",
  async (_, thunkAPI) => {
    try {
      const groups = await authphishApiClient.listGroups({});

      return await Promise.all(
        groups.items.map(async (group) => {
          const result = await scanphishApiClient.listConfigs(
            {},
            true,
            group.id,
          );
          return {
            items: result.itemsAll.map((item) => toConfigModel(item)),
            count: result.count ?? 0,
            groupId: group.id,
          };
        }),
      );
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

export const fetchPublicConfigurationsAction = createAsyncThunk(
  "configurations/fetchConfigurations",
  async (_, thunkAPI) => {
    try {
      const response = await scanphishApiClient.listConfigs({}, true, UUID.NIL);

      const items = response.itemsAll.map((item) => toConfigModel(item));
      const count = response.count ?? 0;

      return {
        items,
        count,
      };
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
