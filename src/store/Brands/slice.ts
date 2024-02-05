import { createSlice } from "@reduxjs/toolkit";

import {
  createBrandAction,
  deleteBrandAction,
  fetchPrivateBrandsAction,
  fetchPublicBrandsAction,
  updateBrandAction,
} from "./actions";
import { BrandsState } from "./types";

const initialState: BrandsState = {
  publicBrands: [],
  privateBrands: [],
  privateBrandsPagination: {
    total: 0,
  },
};

export const brandsSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPublicBrandsAction.fulfilled, (state, action) => {
      state.publicBrands = action.payload;
    });

    builder.addCase(fetchPrivateBrandsAction.fulfilled, (state, action) => {
      state.privateBrandsPagination.total = action.payload.count;

      if (action.meta.arg.loadMore) {
        state.privateBrands.push(...action.payload.items);
        return;
      }
      state.privateBrands = action.payload.items;
    });

    builder.addCase(createBrandAction.fulfilled, (state, action) => {
      state.privateBrands.push(action.payload);
    });

    builder.addCase(updateBrandAction.fulfilled, (state, action) => {
      const index = state.privateBrands.findIndex(
        (brand) => brand.id === action.payload.id,
      );

      // Update the brand in the list if it exists
      if (index !== -1) {
        state.privateBrands[index] = {
          ...state.privateBrands[index],
          ...action.payload,
        };
      }
    });

    builder.addCase(deleteBrandAction.fulfilled, (state, action) => {
      const index = state.privateBrands.findIndex(
        (brand) => brand.id === action.payload,
      );

      // Delete the brand from the list if it exists
      if (index !== -1) {
        state.privateBrands.splice(index, 1);
      }
    });
  },
});
