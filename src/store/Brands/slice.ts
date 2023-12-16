import { createSlice } from "@reduxjs/toolkit";
import { BrandsState } from "./types";
import {
  createBrandAction,
  deleteBrandAction,
  fetchPublicBrandsAction,
  updateBrandAction,
} from "./actions";

const initialState: BrandsState = {
  brands: [],
};

export const brandsSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPublicBrandsAction.fulfilled, (state, action) => {
      state.brands = action.payload;
    });

    builder.addCase(createBrandAction.fulfilled, (state, action) => {
      state.brands.push(action.payload);
    });

    builder.addCase(updateBrandAction.fulfilled, (state, action) => {
      const index = state.brands.findIndex(
        (brand) => brand.id === action.payload.id,
      );

      // Update the brand in the list if it exists
      if (index !== -1) {
        state.brands[index] = { ...state.brands[index], ...action.payload };
      }
    });

    builder.addCase(deleteBrandAction.fulfilled, (state, action) => {
      const index = state.brands.findIndex(
        (brand) => brand.id === action.payload,
      );

      // Delete the brand from the list if it exists
      if (index !== -1) {
        state.brands.splice(index, 1);
      }
    });
  },
});
