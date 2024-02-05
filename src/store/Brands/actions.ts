import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  IBrand,
  IBrandCreatePayload,
  IBrandUpdatePayload,
  UUID,
} from "@hmdlr/types";

import { authphishApiClient, scanphishApiClient } from "../../hooks/useClient";

const PAGE_SIZE = 10;

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
  async (
    { loadMore = false, search }: { loadMore?: boolean; search?: string },
    thunkAPI,
  ) => {
    try {
      const groupsResponse = await authphishApiClient.listGroups({});

      const privateGroupsIds = groupsResponse.items
        .map((group) => group.id)
        .filter((id) => id !== UUID.NIL);

      // @ts-ignore
      const privateBrands = thunkAPI.getState().brands.privateBrands;

      const pageNumber = loadMore
        ? Math.ceil(privateBrands.length / PAGE_SIZE + 1)
        : 1;

      const result = await Promise.all(
        privateGroupsIds.map(async (privateGroupId) => {
          if (!!search) {
            return scanphishApiClient.searchBrands(
              { pageSize: PAGE_SIZE, pageNumber },
              search,
              privateGroupId,
            );
          }

          return scanphishApiClient.listBrands(
            { pageSize: PAGE_SIZE, pageNumber },
            privateGroupId,
          );
        }),
      );

      const items = result.map((response) => response.itemsAll).flat();
      const count = result
        .map((response) => response.count ?? 0)
        .reduce((a, b) => a + b, 0);

      return {
        items,
        count,
      };
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

      // Wait for the brand to be created before enhancing it
      const enhanceResponse = await new Promise((resolve) => {
        setTimeout(async () => {
          resolve(
            await scanphishApiClient.enhanceBrand(createResponse.brand.id),
          );
        }, 1000);
      });

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
