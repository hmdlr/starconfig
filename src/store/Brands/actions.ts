import { createAsyncThunk } from "@reduxjs/toolkit";
import { authphishApiClient, scanphishApiClient } from "../../hooks/useClient";
import {
  IBrand,
  IBrandCreatePayload,
  IBrandUpdatePayload,
  UUID,
} from "@hmdlr/types";

const PAGE_SIZE = 5;

export const fetchPublicBrandsAction = createAsyncThunk(
  "brands/fetchPublicBrands",
  async (arg: undefined, thunkAPI) => {
    try {
      const response = await scanphishApiClient.listBrands({}, UUID.NIL);

      return response.items;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  },
);

export const fetchPrivateBrandsAction = createAsyncThunk(
  "brands/fetchPrivateBrands",
  async ({ loadMore = false }: { loadMore?: boolean }, thunkAPI) => {
    try {
      const groupsResponse = await authphishApiClient.listGroups({});

      const privateGroupsIds = groupsResponse.items
        .map((group) => group.id)
        .filter((id) => id !== UUID.NIL);

      // @ts-ignore
      const privateBrands = thunkAPI.getState().brands.privateBrands;

      const page = loadMore
        ? Math.ceil(privateBrands.length / PAGE_SIZE + 1)
        : 1;

      const result = await Promise.all(
        privateGroupsIds.map(async (privateGroupId) => {
          return scanphishApiClient.listBrands(
            { pageSize: PAGE_SIZE, pageNumber: page },
            privateGroupId,
          );
        }),
      );

      return result.map((response) => response.items).flat();
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  },
);

export const createBrandAction = createAsyncThunk(
  "brands/createBrand",
  async (arg: IBrandCreatePayload, thunkAPI) => {
    try {
      const createResponse = await scanphishApiClient.createBrand(arg);

      const enhanceResponse = await scanphishApiClient.enhanceBrand(
        createResponse.brand.id,
      );

      return {
        ...createResponse.brand,
        // @ts-ignore TODO: remove this after hmdlr/types is updated
        ...enhanceResponse.brand,
      };
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

export const deleteBrandAction = createAsyncThunk(
  "brands/deleteBrand",
  async (arg: IBrand["id"], thunkAPI) => {
    try {
      await scanphishApiClient.deleteBrand(arg);

      return arg;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  },
);
