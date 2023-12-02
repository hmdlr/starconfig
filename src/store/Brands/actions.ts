import { createAsyncThunk } from "@reduxjs/toolkit";
import { scanphishApiClient } from "../../hooks/useClient";
import { IBrand, IBrandCreatePayload, IBrandUpdatePayload } from "@hmdlr/types";

export const fetchBrandsAction = createAsyncThunk(
  "brands/fetchBrands",
  async (arg, thunkAPI) => {
    try {
      const response = await scanphishApiClient.listBrands({});

      return response.items;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  },
);

export const createBrandAction = createAsyncThunk(
  "brands/createBrand",
  async (arg: IBrandCreatePayload, thunkAPI) => {
    try {
      const response = await scanphishApiClient.createBrand(arg);

      return response.brand;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  },
);

export const enhanceBrandAction = createAsyncThunk(
  "brands/enhanceBrand",
  async (arg: IBrand["id"], thunkAPI) => {
    try {
      const response = await scanphishApiClient.enhanceBrand(arg);

      return response.candidates;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  },
);

export const updateBrandAction = createAsyncThunk(
  "brands/updateBrand",
  async (arg: IBrandUpdatePayload & { id: IBrand["id"] }, thunkAPI) => {
    try {
      const updateResponse = await scanphishApiClient.updateBrand(arg.id, arg);

      const enhanceResponse = await scanphishApiClient.enhanceBrand(arg.id);

      return {
        ...updateResponse.brand,
        // @ts-ignore TODO: remove this after hmdlr/types is updated
        ...enhanceResponse.brand,
      };
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  },
);
