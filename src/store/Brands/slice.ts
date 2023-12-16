import { createSlice } from "@reduxjs/toolkit";
import { BrandsState } from "./types";
import {
  createBrandAction,
  deleteBrandAction,
  fetchPrivateBrandsAction,
  fetchPublicBrandsAction,
  updateBrandAction,
} from "./actions";

const initialState: BrandsState = {
  publicBrands: [],
  privateBrands: [],
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
      if (action.meta.arg.loadMore) {
        state.privateBrands.push(...action.payload);
        return;
      }
      state.privateBrands = action.payload;
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
